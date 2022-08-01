import { defineStore } from 'pinia'
import { api } from 'src/boot/axios.js'
import { filters } from 'boot/filters'
import _ from 'lodash'

import { useAppStore } from 'src/stores/app'

export const useBillboardStore = defineStore('billboard', {
  state: () => ({
    _langs: [{
      label: 'English',
      value: 44
    }, {
      label: 'Russian',
      value: 137
    }, {
      label: 'Deutch',
      value: 55
    }],
    _game_types: [{
      label: 'NFT',
      value: 'nft'
    }, {
      label: 'P2E',
      value: 'p2e'
    }, {
      label: 'F2P',
      value: 'f2p'
    }],
    _isCurrentUser: null,
    _isModalOpened: false,
    _advertsFirstPage: false,
    _filter: {},
    _search: null,
    _selectedGame: null,
    _chooseGames: [],
    _chooseGamesNext: null,
    _chooseGamesLoading: true,
    _advertsLoading: false,
    _adverts: [],
    _adverts_pagination: [],
    _error: null
  }),

  getters: {
    discordLink (state) {
      return state._discordLink
    },

    isCurrentUser (state) {
      return state._isCurrentUser
    },

    error (state) {
      return state._error
    },

    isModalOpened (state) {
      return state._isModalOpened
    },

    advertsFirstPage (state) {
      return state._advertsFirstPage
    },

    langs (state) {
      return state._langs
    },

    game_types (state) {
      return state._game_types
    },

    filter (state) {
      return state._filter
    },

    chooseGames (state) {
      return state._chooseGames
    },

    chooseGamesPrev (state) {
      return state._chooseGamesPrev
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
    closeModal () {
      if (this._isModalOpened) {
        this._isModalOpened = false
      }
    },

    openModal () {
      if (!this._isModalOpened) {
        this._isModalOpened = true
      }
    },

    async goPlay (id) {
      const appStore = useAppStore()

      try {
        const result = await api.post('billboard/play/' + id, null, {})
        if (result.data.url) {
          window.open(result.data.url, '_blank').focus()
          await this.loadAdverts({
            disableLoader: true
          })
        }
      } catch (e) {
        const data = e.response.data
        if (data.type) {
          await appStore.setErrors(data.type, {
            async: true,
            store: 'billboard',
            name: 'goPlay',
            arguments
          })
        }
      }
    },

    async setCurrentUser (state) {
      this._isCurrentUser = state
    },

    async updateFilter (val) {
      this._filter = val
      await this.loadAdverts()
    },

    async search (val) {
      this._search = val
      await this.loadChooseGames()
    },

    async loadChooseGames (append) {
      let url = 'billboard/choose/games'
      if (append) {
        if (this._chooseGames.length <= 0) return
        url = this._chooseGamesNext
      } else {
        this._chooseGamesLoading = true
      }

      await api.post(url, null, {
        params: {
          search: this._search
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        this._chooseGamesNext = res.data.next_page_url
        let result = res.data.data

        result = _.map(result, (item) => {
          return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            logo: filters.imageFullUrl(item.logo),
            blockchain_image: filters.imageFullUrl(item.blockchain_image),
            devices: _.isString(item.devices) ? item.devices.split('||') : [],
            genres: _.isString(item.genres) ? item.genres.split('||') : []
          }
        })

        if (append) {
          this._chooseGames = _.union(this._chooseGames, result)
        } else {
          this._chooseGames = result
          if (!this._selectedGame) {
            await this.setCurrentGame(_.head(result))
            await this.loadAdverts()
          }

          this._chooseGamesLoading = false
        }
      })
    },

    async publish (data) {
      data.additional_info = data.name
      data.name = data.name.slice(0, 100)

      await api.post('billboard/add/advert', null, {
        params: data
      }).then(async (res) => {
        if (this.selectedGame) {
          await this.loadAdverts()
          this._isModalOpened = false
        }
      }).catch(async (err) => {
        console.log('err', err)
      })
    },

    async setCurrentGame (item) {
      const appStore = useAppStore()

      this._selectedGame = item
      appStore.setList('games', [{
        value: item.id,
        label: item.name
      }])
    },

    async loadAdverts (params) {
      let disableLoader = false
      if (_.isObject(params) && ('disableLoader' in params)) {
        disableLoader = true
      }

      if (!disableLoader) {
        this._advertsLoading = true
      }

      // Определяем параметры
      let targetUrl = 'billboard/adverts'
      let filter = {}

      if (_.isString(params)) { // Прямой запрос с URL (для пагинации и др.)
        targetUrl = params
      } else if (_.isObject(params)) {
        if (params.filter) {
          filter = _.merge(filter, params.filter)
        }
      }

      if (this.isCurrentUser === null) {
        const game = this._selectedGame
        if (game) {
          const gameId = game.id
          if (gameId) {
            filter.game_id = gameId
          }
        }
      } else {
        filter.metapass = this.isCurrentUser
      }

      await api.post(targetUrl, null, {
        params: filter
      }).then((res) => {
        const rawData = res.data
        if (rawData.total > 0) {
          this._adverts_pagination = rawData.links
          const rawItems = rawData.data
          const result = _.map(rawItems, (item) => {
            const type = item.type
            item.game_devices = item.game_devices ? item.game_devices.split('||') : []
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
          if (rawData.current_page > 1) {
            this._advertsFirstPage = true
          } else {
            this._advertsFirstPage = false
          }
        } else {
          this._advertsFirstPage = false
          this._adverts = []
          this._adverts_pagination = []
        }
      })

      if (!disableLoader) {
        this._advertsLoading = false
      }
    }
  }
})
