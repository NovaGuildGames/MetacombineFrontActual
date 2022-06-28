<template>
  <q-page class="q-pt-lg">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <div class="text-h3">
          Games
        </div>
        <q-btn :ripple="false" flat rounded color="primary" class="text-bold" label="All games" />
      </div>

      <div class="q-mb-md">
        <q-input
          v-model="search"
          debounce="500"
          placeholder="Search game"
        >
          <template v-slot:prepend>
            <q-icon name="eva-search-outline" />
          </template>
        </q-input>
      </div>

      <ChooseGames :items="billboardStore.chooseGames" :isLoading="billboardStore.chooseGamesLoading" @selected="onChooseGameSelected" />
    </div>
  </q-page>
</template>

<script>
import ChooseGames from 'components/billboard/ChooseGames'
import { useBillboardStore } from 'stores/billboard'

import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ChooseGames
  },
  setup () {
    const appStore = useAppStore()
    const billboardStore = useBillboardStore()

    return {
      appStore,
      billboardStore
    }
  },
  methods: {
    async add () {
      await this.appStore.add()
    },

    async onChooseGameSelected (item) {
      console.log(item)
    }
  },
  async mounted () {
    await this.billboardStore.loadChooseGames()
  }
})
</script>
