import { ref } from 'vue'

const isAdmin = ref(sessionStorage.getItem('an_admin') === '1')

export function useAdminState() {
  function login(password) {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      isAdmin.value = true
      sessionStorage.setItem('an_admin', '1')
      return true
    }
    return false
  }

  function logout() {
    isAdmin.value = false
    sessionStorage.removeItem('an_admin')
  }

  return { isAdmin, login, logout }
}
