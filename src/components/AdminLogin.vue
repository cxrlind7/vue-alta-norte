<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8">
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="text-xl font-extrabold text-slate-900">Acceso Administrativo</h2>
        <p class="text-sm text-slate-500 mt-1">Alta Norte</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            autofocus
            class="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="••••••••"
          />
          <p v-if="error" class="text-red-500 text-xs mt-1.5 font-medium">Contraseña incorrecta</p>
        </div>
        <button
          type="submit"
          class="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl transition-all text-sm"
        >
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminState } from '../composables/useAdminState'

const emit = defineEmits(['success'])
const { login } = useAdminState()

const password = ref('')
const error    = ref(false)

function submit() {
  error.value = false
  if (login(password.value)) {
    window.location.reload()
  } else {
    error.value = true
    password.value = ''
  }
}
</script>
