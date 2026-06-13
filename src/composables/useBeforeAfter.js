import { ref } from 'vue'

// Module-level singleton — same pattern as useTourState
const showNew = ref(false)

export function useBeforeAfter() {
  return { showNew }
}
