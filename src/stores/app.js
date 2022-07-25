import { defineStore } from 'pinia'
const config = require('src/boot/app.config.js')
import { api } from 'src/boot/axios.js'

import { useAuthStore } from './app/auth'
const authStore = useAuthStore()

export const useAppStore = defineStore('app', {
  state: () => ({
    _lists: {},
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
    lists (state) {
      return state._lists
    },

    config (state) {
      return state._config
    },

    slides (state) {
      return state._slides
    }
  },

  actions: {
    async setList (key, val) {
      this._lists[key] = val
    },

    async loadList (key, val) {
      await api.get(`lists/${key}`, {
        params: {
          query: val
        }
      }).then(async (res) => {
        this._lists[key] = res.data || []
      })
    },

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