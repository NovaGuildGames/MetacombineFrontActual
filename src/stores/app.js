import { defineStore } from 'pinia'
const config = require('src/boot/app.config.js')

import { useAuthStore } from './app/auth'
const authStore = useAuthStore()

export const useAppStore = defineStore('app', {
  state: () => ({
    _config: {
      infura_key: null
    }
  }),

  getters: {
    config (state) {
      return state._config
    }
  },

  actions: {
    async initializeConfig () {
      this._config = config
    },

    async initialize () {
      await this.initializeConfig()
      authStore.initializeAuth()
    }
  }
})
