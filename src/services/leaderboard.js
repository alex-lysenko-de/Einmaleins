/**
 * Remote leaderboard via JSONBin.io
 * Uses optimistic locking as described in score.txt
 */

const BIN_ID     = '69ad95cfae596e708f6d22d8'
const ACCESS_KEY = '$2a$10$NPCaffxcpTEMpt/8W.8p2OhIJQV76Rop9qqqZB.dGPjdtVNAkEOsS'
const BASE_URL   = `https://api.jsonbin.io/v3/b/${BIN_ID}`
const LOCK_TTL   = 5000   // ms
const MAX_RETRY  = 6
const RETRY_DELAY = 700   // ms

function headers(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'X-Access-Key': ACCESS_KEY,
    ...extra,
  }
}

async function readBin() {
  const res = await fetch(`${BASE_URL}/latest`, { headers: headers() })
  if (!res.ok) throw new Error(`JSONBin read failed: ${res.status}`)
  const json = await res.json()
  return json.record
}

async function writeBin(data) {
  const res = await fetch(BASE_URL, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`JSONBin write failed: ${res.status}`)
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

/**
 * Submit a score with optimistic locking.
 * @param {string} userId  player GUID
 * @param {string} name    player display name
 * @param {number} score   score to submit
 */
export async function submitScore(userId, name, score) {
  for (let attempt = 0; attempt < MAX_RETRY; attempt++) {
    try {
      const data = await readBin()

      // Check lock
      if (data.lockedBy) {
        const age = Date.now() - new Date(data.lockedBy.lockedAt).getTime()
        if (age < LOCK_TTL) {
          await sleep(RETRY_DELAY)
          continue
        }
      }

      // Acquire lock
      data.lockedBy = { userId, lockedAt: new Date().toISOString() }
      await writeBin(data)

      // Update users list
      if (!Array.isArray(data.users)) data.users = []
      const userIdx = data.users.findIndex(u => u.guid === userId)
      if (userIdx === -1) data.users.push({ guid: userId, name })
      else data.users[userIdx].name = name

      // Update scores
      if (!Array.isArray(data.scores)) data.scores = []
      const scoreIdx = data.scores.findIndex(s => s.userId === userId)
      if (scoreIdx === -1) {
        data.scores.push({ userId, bestScore: score, updatedAt: new Date().toISOString() })
      } else if (score > data.scores[scoreIdx].bestScore) {
        data.scores[scoreIdx].bestScore = score
        data.scores[scoreIdx].updatedAt = new Date().toISOString()
      }

      // Release lock
      data.lockedBy = null
      await writeBin(data)
      return { success: true }

    } catch (err) {
      if (attempt === MAX_RETRY - 1) {
        console.error('Leaderboard submit failed:', err)
        return { success: false, error: err.message }
      }
      await sleep(RETRY_DELAY)
    }
  }
  return { success: false, error: 'Max retries exceeded' }
}

/**
 * Fetch the top 10 scores + the current player's entry.
 * @param {string} userId  current player GUID
 * @returns {{ top10: Array, myEntry: object|null, myRank: number|null }}
 */
export async function fetchLeaderboard(userId) {
  try {
    const data = await readBin()
    const users  = Array.isArray(data.users)  ? data.users  : []
    const scores = Array.isArray(data.scores) ? data.scores : []

    const enriched = scores
      .map(s => {
        const user = users.find(u => u.guid === s.userId)
        return { ...s, name: user?.name || 'Unknown' }
      })
      .sort((a, b) => b.bestScore - a.bestScore)

    const myRank  = enriched.findIndex(s => s.userId === userId) + 1 || null
    const myEntry = enriched.find(s => s.userId === userId) || null
    const top10   = enriched.slice(0, 10)

    return { top10, myEntry, myRank: myRank || null }
  } catch (err) {
    console.error('Leaderboard fetch failed:', err)
    return { top10: [], myEntry: null, myRank: null, error: err.message }
  }
}
