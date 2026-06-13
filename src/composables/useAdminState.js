import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const isAdmin = ref(false)

if (supabase) {
  supabase.auth.getSession().then(({ data }) => {
    isAdmin.value = !!data.session
  })
  supabase.auth.onAuthStateChange((_event, session) => {
    isAdmin.value = !!session
  })
}

export function useAdminState() {
  async function login(email, password) {
    if (!supabase) return 'Supabase no configurado'
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? error.message : null
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut()
    isAdmin.value = false
  }

  return { isAdmin, login, logout }
}
