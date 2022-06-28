import { defineStore } from 'pinia'
import { api } from 'src/boot/axios.js'
import { filters } from 'boot/filters'
import _ from 'lodash'

export const useBillboardStore = defineStore('billboard', {
  state: () => ({
    _chooseGames: [],
    _chooseGamesLoading: false
  }),

  getters: {
    chooseGames (state) {
      return state._chooseGames
    },

    chooseGamesLoading (state) {
      return state._chooseGamesLoading
    }
  },

  actions: {
    async loadChooseGames () {
      this._chooseGamesLoading = true
      await api.get('billboard/choose/games').then((res) => {
        const rawData = res.data || []
        const result = _.map(rawData, (item) => {
          return {
            id: item.id,
            name: item.name,
            logo: filters.imageFullUrl(item.logo),
            blockchain_image: filters.imageFullUrl(item.blockchain_image),
            devices: item.devices ? item.devices.split('||') : [],
            genres: item.genres ? item.genres.split('||') : []
          }
        })

        this._chooseGames = result
        this._chooseGamesLoading = false
      })
    }
  }
})
