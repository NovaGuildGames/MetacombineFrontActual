import { defineStore } from 'pinia'
const config = require('src/boot/app.config.js')
import { api } from 'src/boot/axios.js'

import { useAuthStore } from './app/auth'
const authStore = useAuthStore()

// Список для импорта
import { useBillboardStore } from './billboard'

export const useAppStore = defineStore('app', {
  state: () => ({
    _errors: {},
    _errorsData: {},
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
    errors (state) {
      return state._errors
    },

    errorsData (state) {
      return state._errorsData
    },

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
    async updateMetapass (data) {
      try {
        const result = await api.post('metapass/update', data)
        console.log(result)
      } catch (e) {

      }
    },

    async removeErrors (key) {
      console.log('Удалить', key)
      if (key in this._errorsData) {
        const call = this.errorsData[key].call
        if (call) {
          let store = null
          switch (call.store) {
            case 'billboard':
              store = useBillboardStore()
              break
          }

          if (store && call.name) {
            const params = call.arguments || []
            if (call.async) {
              await store[call.name].apply(store, params)
            } else {
              store[call.name].apply(store, params)
            }
          }
        }

        delete this.errorsData[key]
      }
      if (key in this._errors) {
        delete this._errors[key]
      }
    },

    async setErrors (key, call) {
      this._errorsData[key] = {
        call
      }
      this._errors[key] = true
    },

    async setList (key, val) {
      this._lists[key] = val
    },

    async loadList (key, val) {
      await api.post(`lists/${key}`, {
        query: val
      }).then(async (res) => {
        this._lists[key] = res.data || []
      })
    },

    async loadLists () {
      await api.post('lists/all').then(async (res) => {
        this._lists = res.data || {}
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
