import { boot } from 'quasar/wrappers'
// import moment from 'moment'
const config = require('./app.config.js')

const filters = {
  /*
  dateFilter (date) {
    return moment(new Date(date)).format('DD.MM.YYYY hh:mm')
  },
  newsDateFilter (date) {
    return moment({ date }).fromNow()
  },
  */
  imageFullUrl (url, defaultImage) {
    if (!url) return null
    /*
    if (!url) {
      if (!defaultImage) return null
      const noimages = store.getters['app/noimages']
      if (!(defaultImage in noimages)) return null
      url = noimages[defaultImage]
    }
    */
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
