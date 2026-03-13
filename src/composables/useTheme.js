import { ref } from 'vue'

const STORAGE_KEY = 'einmaleins-theme'
const theme = ref('dark')

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t)
  theme.value = t
}

// Module-level init — runs once when first imported
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY)
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light'))

  // Follow system only if user hasn't manually overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })
}

export function useTheme() {
  function toggleTheme() {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return { theme, toggleTheme }
}
