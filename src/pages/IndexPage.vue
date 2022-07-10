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
          <BillboardList @onClickNew="onClickNewBillboard" :items="billboardStore.adverts" :isLoading="billboardStore.advertsLoading" :pagination="billboardStore.advertsPagination" />
        </div>
      </div>
    </div>

    <q-dialog v-model="rightModal" :seamless="true" class="modal-default" :square="true" position="right" full-height>
      <div class="modal-back">
        <div class="modal-back-inner">
          <div class="row items-center justify-between q-mb-lg">
            <div class="col-auto">
              <q-btn flat label="New ad" icon="close" class="text-weight-medium q-px-none icon-gray" :ripple="false" />
            </div>

            <div>
              <q-btn label="Publish" color="primary" class="text-weight-medium" />
            </div>
          </div>

          <q-separator />

          <q-form class="q-gutter-md q-mt-lg">
            <div>
              <div class="input-label">
                Name game
              </div>

              <!--q-select
                clearable
                v-model="register.player.location_id"
                label="Location"
                name="location_id"
                :options="lists.locations"
                @filter="(val, update) => filterUpdate(val, update, 'locations')"
                use-input
                filled
              /-->

              <q-input
                filled
                dense
                placeholder='For example "Axie Infinity"'
                v-model="name"
              />
            </div>

            <div>
              <div class="input-label">
                Content
              </div>
              <q-input
                filled
                class="default-textarea"
                v-model="name"
                type="textarea"
                placeholder="Text"
              />
            </div>

            <div class="q-mt-lg">
              <div class="q-mb-md">
                <div class="row items-end">
                  <div class="col-auto ">
                    <div class="f2 fw-500 lh08">
                      {{standard}}
                    </div>
                  </div>
                  <div class="col-auto q-ml-xs">
                    <div class="text-grey-8 text-caption">
                      Players
                    </div>
                  </div>
                </div>
              </div>
              <q-slider thumb-size="24px" v-model="standard" :min="1" :max="spot_all" />
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
  props: [
    'game'
  ],
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
      search: null,
      rightModal: false,
      standard: 0,
      spot_all: 10,
      name: null
    }
  },
  methods: {
    async add () {
      await this.appStore.add()
    },

    async onChooseGameSelected (item) {
      await this.$router.push({
        name: 'billboard-by-game',
        params: {
          game: item.slug
        },
        replace: true
      })

      await this.billboardStore.loadAdverts(item.slug)
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
