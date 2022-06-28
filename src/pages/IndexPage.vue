<template>
  <q-page class="q-pa-lg">
    <div class="q-py-md row justify-between">
      <div class="text-h4">
        Games
      </div>
      <q-btn :ripple="false" flat rounded color="primary" label="All games" />
    </div>

    <div class="q-mb-md">
      <q-input
        v-model="search"
        debounce="500"
        placeholder="Search game"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <ChooseGames :items="billboardStore.chooseGames" :isLoading="billboardStore.chooseGamesLoading" @selected="onChooseGameSelected" />

    <q-btn @click="add">Add slide</q-btn>
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
