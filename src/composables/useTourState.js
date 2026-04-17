import { ref } from 'vue'

const tourOpen = ref(false)

export function useTourState() {
  return { tourOpen }
}
