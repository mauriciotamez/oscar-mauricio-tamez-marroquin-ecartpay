import { ref, onMounted } from 'vue'

const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

export function useTheme() {
  onMounted(() => {
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  return {
    isDark,
    toggleTheme
  }
}
