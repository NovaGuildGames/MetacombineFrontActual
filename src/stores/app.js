import { defineStore } from 'pinia'
const config = require('src/boot/app.config.js')

import { useAuthStore } from './app/auth'
const authStore = useAuthStore()

export const useAppStore = defineStore('app', {
  state: () => ({
    _config: {
      infura_key: null
    },
    _slides: [
      {
        name: 'Slide 1'
      },
      {
        name: 'Slide 2'
      },
      {
        name: 'Slide 3'
      }
    ]
  }),

  getters: {
    config (state) {
      return state._config
    },

    slides (state) {
      return state._slides
    }
  },

  actions: {
    async add () {
      this._slides.push({
        name: 'Slide 5'
      })
    },

    async initializeConfig () {
      this._config = config
    },

    async initialize () {
      await this.initializeConfig()
      await authStore.initializeAuth()
    }
  }
})
