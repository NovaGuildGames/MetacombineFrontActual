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
        const rawData = [
          {
            id: 7,
            name: 'Axie Infinity',
            logo: 'games/fc93491b0fea53ab79dc0717c3704c5c.jpg',
            blockchain_image:
              'blockchains/6f1799c861ef34376e02156b71030428.png',
            devices: 'Android||IOS||Windows',
            genres: 'Breeding||Card||PVP'
          },
          {
            id: 8,
            name: 'Decentraland',
            logo: 'games/1fa54f9858bd37254dd4263d6ad84b23.png',
            blockchain_image:
              'blockchains/6f1799c861ef34376e02156b71030428.png',
            devices: null,
            genres: null
          },
          {
            id: 9,
            name: 'Game for Soroka',
            logo: 'games/logos/J6qLcD3WqlATjDu2WLQnubTodIRaC99ucYbh1rsw.png',
            blockchain_image:
              'blockchains/80d95d31f4babe4c99707cd66372732e.png',
            devices: null,
            genres: 'Logic'
          },
          {
            id: 10,
            name: 'Dettroxx game',
            logo: 'games/logos/Hz5puMVVVchCuDS50iofCxZ28Qbil0wsQUxUjxiA.jpg',
            blockchain_image: null,
            devices: 'Android||Linux||Web',
            genres: 'All-Genre||Art||Augmented-Reality||Auto-Battler||Board'
          },
          {
            id: 11,
            name: 'Dastan Game',
            logo: 'games/logos/Gl8pM7l2mbJit5YfNic72svZ0pSPiq5xqtjcUAjH.jpg',
            blockchain_image: null,
            devices: 'MAC||Nintendo||Playstation',
            genres: 'Arcade||Art||Augmented-Reality'
          }
        ]

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
