function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

export function createMemoryCards(level) {
  let id = 0
  const questions = []
  const answers   = []

  for (let factor = 2; factor <= 10; factor++) {
    const pairId    = factor
    const result    = level * factor
    questions.push({
      id, type: 'question',
      value: `${level} × ${factor}`,
      pairId, state: 'hidden',
    })
    id++
    answers.push({
      id, type: 'answer',
      value: String(result),
      matchValue: `${level} × ${factor}`,
      pairId, state: 'hidden',
    })
    id++
  }

  shuffle(answers)
  return { questions, answers }
}
