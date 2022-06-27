import { boot } from 'quasar/wrappers'
import { useAppStore } from 'src/stores/app'

export default boot(async ({ app, store }) => {
  const appStore = useAppStore(store)
  appStore.initialize()
})
