import { defineStore } from 'pinia'
import { useAppStore } from '../app'

export const useAuthStore = defineStore('auth', {
  state: () => ({

  }),

  getters: {

  },

  actions: {
    async initializeAuth () {
      const appStore = useAppStore()
      const infuraKey = appStore.config.infura_key
      if (infuraKey) {
        throw new Error({ code: 500101 })
      }
    }
  }
})
