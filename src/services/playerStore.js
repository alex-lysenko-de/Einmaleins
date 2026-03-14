/**
 * Local storage layer for player data.
 * Keys: einmaleins:playerName, einmaleins:playerGuid,
 *       einmaleins:gameHistory, einmaleins:campaignProgress
 */

const KEY_NAME     = 'einmaleins:playerName'
const KEY_GUID     = 'einmaleins:playerGuid'
const KEY_HISTORY  = 'einmaleins:gameHistory'
const KEY_CAMPAIGN = 'einmaleins:campaignProgress'

// ── GUID ──────────────────────────────────────────────────────────────────────
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function getOrCreateGuid() {
  let g = localStorage.getItem(KEY_GUID)
  if (!g) {
    g = generateGuid()
    localStorage.setItem(KEY_GUID, g)
  }
  return g
}

// ── Player name ───────────────────────────────────────────────────────────────
export function getPlayerName() {
  return localStorage.getItem(KEY_NAME) || null
}

export function savePlayerName(name) {
  localStorage.setItem(KEY_NAME, name.trim())
}

export function isPlayerSetup() {
  return !!getPlayerName()
}

// ── Game history ──────────────────────────────────────────────────────────────
export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY_HISTORY) || '[]')
  } catch { return [] }
}

/**
 * @param {object} entry  { score, correctAnswers, total, level, date }
 */
export function addHistoryEntry(entry) {
  const history = getHistory()
  history.unshift({ ...entry, date: new Date().toISOString() })
  // keep last 50 entries
  localStorage.setItem(KEY_HISTORY, JSON.stringify(history.slice(0, 50)))
}

export function getLocalBestScore() {
  const history = getHistory()
  if (!history.length) return 0
  return Math.max(...history.map(e => e.score || 0))
}

// ── Campaign progress ─────────────────────────────────────────────────────────
export function getCampaignProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY_CAMPAIGN) || '{}')
  } catch { return {} }
}

export function saveCampaignProgress(data) {
  localStorage.setItem(KEY_CAMPAIGN, JSON.stringify(data))
}
