import { boot } from 'quasar/wrappers'
const config = require('./app.config.js')

const filters = {
  imageFullUrl (url, defaultImage) {
    if (!url) return null
    const apiUrl = config.filesUrl || ''
    url = url.replace(/^\//ui, '')
    const fullUrl = apiUrl + '/' + url
    return fullUrl
  }
}

export default boot(async ({ app, store }) => {
  app.config.globalProperties.$filters = filters
})

export { filters }
