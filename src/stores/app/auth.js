import { defineStore } from 'pinia'
import { useAppStore } from '../app'
import { api } from 'src/boot/axios.js'
import { filters } from 'boot/filters'
import _ from 'lodash'

// Импорт доп библиотек
const Web3Modal = window.Web3Modal.default
const WalletConnectProvider = window.WalletConnectProvider.default
const Web3 = window.Web3
// const evmChains = window.evmChains

// Данные
let web3Modal
let web3
let provider
let selectedAccount

export const useAuthStore = defineStore('auth', {
  state: () => ({
    _isLoaded: false,
    _isLoading: false,
    _isRegistered: false,
    _isVerified: false,
    _address: null,
    _token: null,
    _metapass: null,
    _registerErrors: null,
    _whiteListError: false
  }),

  getters: {
    whiteListError (state) {
      return state._whiteListError
    },

    isLoaded (state) {
      return state._isLoaded
    },

    isConnected (state) {
      if (state._address) {
        return true
      } else {
        return false
      }
    },

    isLoggedIn (state) {
      if (state._metapass) {
        return true
      } else {
        return false
      }
    },

    isLoading (state) {
      return state._isLoading
    },

    isRegistered (state) {
      return state._isRegistered
    },

    isVerified (state) {
      return state._isVerified
    },

    address (state) {
      return state._address
    },

    metapass (state) {
      return state._metapass
    },

    token (state) {
      return state._token
    },

    registerErrors (state) {
      return state._registerErrors
    }
  },

  actions: {
    async initializeAuth () {
      await this.tryAuth({ init: true })

      const appStore = useAppStore()
      const infuraKey = appStore.config.infura_key
      if (!infuraKey) {
        throw new Error({ code: 500101 })
      }

      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: infuraKey
          }
        }
      }

      web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        disableInjectedProvider: false
      })

      web3Modal.clearCachedProvider()
    },

    async validate (key, label) {
      const items = this._registerErrors

      if (items && items.errors) {
        if (key in items.errors) {
          return label + ': ' + items.errors[key].join(', ')
        }
      }
      return true
    },

    async updateLogo (formData) {
      this._registerErrors = {}
      await api.post('metapass/update/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async () => {
        await this.tryAuth()
      }).catch(async (err) => {
        const response = err.response
        const data = response.data
        this._registerErrors = data
      })
    },

    async updatePlayerProfile (formData) {
      await this.updateProfile(formData, 'metapass/update/player/profile')
    },

    async updateProfile (formData, url) {
      this._registerErrors = {}
      await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async () => {
        await this.tryAuth()
      }).catch(async (err) => {
        const response = err.response
        const data = response.data
        this._registerErrors = data
      })
    },

    async registerMetapass (formData) {
      this._registerErrors = {}
      await api.post('register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async () => {
        await this.tryAuth()
      }).catch(async (err) => {
        const response = err.response
        const data = response.data
        this._registerErrors = data
        this.updateCheckErrors(data)
      })
    },

    async updateCheckErrors (errors) {
      if (errors && ('errors' in errors)) {
        const errorslist = errors.errors
        if (('address' in errorslist) && (errorslist.address.indexOf('validation.exists') !== -1)) {
          this._whiteListError = true
        }
      }
    },

    async tryAuth (params) {
      this._isLoading = true
      const token = localStorage.getItem('auth_token')
      const address = this.address
      this._token = token

      await api.post('auth/check-logged', null, {
        params: {
          address
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async (response) => {
        if (response.status === 200) {
          const data = response.data
          const metapass = data.metapass

          if (metapass && metapass.logo) {
            metapass.logo = filters.imageFullUrl(metapass.logo)
          }

          if (metapass && metapass.profile) {
            if (metapass.profile.devices) {
              metapass.profile.devices = _.map(metapass.profile.devices.split('||'), (item) => {
                return +parseInt(item)
              })
            }

            if (metapass.profile.languages) {
              metapass.profile.languages = _.map(metapass.profile.languages.split('||'), (item) => {
                return +parseInt(item)
              })
            }
          }

          this._metapass = metapass
          if (data.metapass) {
            api.defaults.headers.common.Authorization = 'Bearer ' + token
            if (!params || !params.init) {
              this.router.push({ name: 'profile' })
            }
          }

          this._isVerified = data.verified
          this._isRegistered = data.registered

          if (this.isConnected && !data.metapass) {
            if (data.registered) {
              await this.login()
            } else {
              this._isLoading = false
              this.router.push({ name: 'register' })
            }
          } else {
            if (!this._isLoaded) this._isLoaded = true
            this._isLoading = false
          }
        }
      }).catch(async () => {
        this._isLoading = false
      })
    },

    async login () {
      const response = await api.post('web3-login-message', JSON.stringify({ address: this.address }), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      await this.onSignLogin(response.data)
    },

    async logout () {
      this._isLoading = true
      const response = await api.post('auth/logout', null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      if (response.data) {
        localStorage.removeItem('auth_token')
        this._address = null
        if (provider) {
          try {
            provider.disconnect()
          } catch {}
        }
        this.router.push({ name: 'index' })
        await this.tryAuth()
      }
    },

    async onSignLogin (message) {
      const address = this.address
      const self = this

      web3.eth.personal.sign(
        message,
        address,
        '',
        async function (err, signature) {
          if (err) console.log('Sign error', err)

          const bodyData = {
            address,
            signature
          }

          const response = await api.post('web3-login-verify', JSON.stringify(bodyData), {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          })

          const data = response.data
          if (data) {
            localStorage.setItem('auth_token', data)
            self._token = data
            this._isLoading = false
            await self.tryAuth()
          }
        }
      )
    },

    async connect () {
      try {
        provider = await web3Modal.connect()
      } catch (e) {
        console.log('Could not get a wallet connection', e)
        return
      }

      if (!provider) return

      provider.on('accountsChanged', async (accounts) => {
        await this.fetchAccountData()
      })

      provider.on('chainChanged', async (accounts) => {
        await this.fetchAccountData()
      })

      provider.on('chainChanged', async (accounts) => {
        await this.fetchAccountData()
      })

      await this.refreshAccountData()
    },

    async refreshAccountData () {
      await this.fetchAccountData()
      await this.tryAuth()
    },

    async fetchAccountData () {
      web3 = new Web3(provider)
      // const chainId = await web3.eth.getChainId()
      // const chainData = evmChains.getChain(chainId)
      const accounts = await web3.eth.getAccounts()

      selectedAccount = accounts[0]
      if (selectedAccount) {
        this._address = selectedAccount
      }
    }
  }
})
