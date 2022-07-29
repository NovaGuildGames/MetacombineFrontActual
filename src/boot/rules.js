import { boot } from 'quasar/wrappers'

export default boot(async ({ app }) => {
  app.config.globalProperties.$rules = {
    discord_nickname (val) {
      if (!val || typeof val === 'undefined' || !val.match(/.*[^# ]#[0-9]{4}/ui)) return 'Discord nickname is not valid'
      return true
    }
  }
})
