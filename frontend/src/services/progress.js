import { ref, readonly } from 'vue'

const progress = ref(false)

const show = () => {
  progress.value = true
}

const hide = () => {
  progress.value = false
}

export const useProgressBarService = () => ({
  progress: readonly(progress),
  show,
  hide
})
