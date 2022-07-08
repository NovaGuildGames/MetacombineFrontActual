<template>
  <q-page class="q-pt-lg overflow-hidden">
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
            <q-icon name="eva-search-outline" color="grey-5" />
          </template>
        </q-input>
      </div>

      <ChooseGames :items="billboardStore.chooseGames" :isLoading="billboardStore.chooseGamesLoading" @selected="onChooseGameSelected" />

      <div class="row">
        <div class="col-8">
          <BillboardList @onClickNew="onClickNewBillboard" />
        </div>
      </div>
    </div>

    <q-dialog v-model="rightModal" :seamless="true" class="modal-default" :square="true" position="right" full-height>
      <div class="modal-back">
        <div class="modal-back-inner">
          <div class="row items-center justify-between q-mb-lg">
            <div class="col-auto">
              <q-btn flat label="New ad" class="text-weight-medium" />
            </div>

            <div>
              <q-btn label="Publish" color="primary" class="text-weight-medium" />
            </div>
          </div>

          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              type="number"
              v-model="age"
              label="Your age *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import ChooseGames from 'components/billboard/ChooseGames'
import BillboardList from 'components/billboard/BillboardList'
import { useBillboardStore } from 'stores/billboard'

import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ChooseGames,
    BillboardList
  },
  setup () {
    const appStore = useAppStore()
    const billboardStore = useBillboardStore()

    return {
      appStore,
      billboardStore
    }
  },
  data () {
    return {
      rightModal: false
    }
  },
  methods: {
    async add () {
      await this.appStore.add()
    },

    async onChooseGameSelected (item) {
      console.log(item)
    },

    async onClickNewBillboard () {
      this.rightModal = true
    }
  },
  async mounted () {
    await this.billboardStore.loadChooseGames()
  }
})
</script>
