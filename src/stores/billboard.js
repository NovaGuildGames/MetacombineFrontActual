import { defineStore } from 'pinia'
import { api } from 'src/boot/axios.js'
import { filters } from 'boot/filters'
import _ from 'lodash'

export const useBillboardStore = defineStore('billboard', {
  state: () => ({
    _published: false,
    _selectedGame: null,
    _chooseGames: [],
    _chooseGamesLoading: false,
    _advertsLoading: false,
    _adverts: [],
    _adverts_pagination: []
  }),

  getters: {
    published (state) {
      return state._published
    },

    chooseGames (state) {
      return state._chooseGames
    },

    chooseGamesLoading (state) {
      return state._chooseGamesLoading
    },

    adverts (state) {
      return state._adverts
    },

    advertsLoading (state) {
      return state._advertsLoading
    },

    advertsPagination (state) {
      return state._adverts_pagination
    },

    selectedGame (state) {
      return state._selectedGame
    },

    listGames (state) {
      const games = state._chooseGames
      const result = _.map(games, (item) => {
        return {
          label: item.name,
          value: item.id
        }
      })
      return result
    }
  },

  actions: {
    async publish (data) {
      this._published = false
      data.additional_info = data.name
      data.name = data.name.slice(0, 100)

      await api.post('billboard/add/advert', null, {
        params: data
      }).then(async (res) => {
        if (this.selectedGame) {
          this._published = true
          this.loadAdverts(this.selectedGame.slug)
        }
      }).catch(async (err) => {
        console.log('err', err)
      })
    },

    async loadChooseGames () {
      this._chooseGamesLoading = true
      await api.post('billboard/choose/games').then((res) => {
        const rawData = res.data
        const result = _.map(rawData, (item) => {
          return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            logo: filters.imageFullUrl(item.logo),
            blockchain_image: filters.imageFullUrl(item.blockchain_image),
            devices: item.devices ? item.devices.split('||') : [],
            genres: item.genres ? item.genres.split('||') : []
          }
        })

        this._chooseGames = result
        this._chooseGamesLoading = false
      })
    },

    async loadAdverts (gameSlug) {
      this._advertsLoading = true
      const game = _.find(this.chooseGames, (item) => {
        return item.slug === gameSlug
      })
      if (game) {
        this._selectedGame = game
        const gameId = game.id
        await api.post('billboard/choose/bygame/' + gameId).then((res) => {
          const rawData = res.data
          if (rawData.total > 0) {
            this._adverts_pagination = rawData.links
            const rawItems = rawData.data
            const result = _.map(rawItems, (item) => {
              const type = item.type
              item.devices = item.devices ? item.devices.split('||') : []

              // Логотипы
              const logos = []
              if (item.players_logos) {
                _.merge(logos, item.players_logos.split('||'))
              }
              if (item.games_logos) {
                _.merge(logos, item.games_logos.split('||'))
              }
              if (item.guilds_logos) {
                _.merge(logos, item.guilds_logos.split('||'))
              }
              item.logos = _.map(logos, (item) => {
                return filters.imageFullUrl(item)
              })

              if (type === 1) {
                item.logo = filters.imageFullUrl(item.logo_player_author)
                item.author = item.author_player
              } else if (type === 2) {
                item.logo = filters.imageFullUrl(item.logo_game_author)
                item.author = item.author_game
              } else if (type === 3) {
                item.logo = filters.imageFullUrl(item.logo_guild_author)
                item.author = item.author_guild
              }

              return item
            })
            this._adverts = result
          } else {
            this._adverts = []
            this._adverts_pagination = []
          }
        })
      }

      this._advertsLoading = false
    }
  }
})