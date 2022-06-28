import { boot } from 'quasar/wrappers'
import axios from 'axios'
const config = require('./app.config.js')

const api = axios.create({ baseURL: config.apiUrl })
api.defaults.headers.common.Accept = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
