<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <div class="text-h3">
          Games
        </div>
        <!--q-btn :ripple="false" flat rounded color="primary" class="text-bold" label="All games" /-->
      </div>

      <div class="q-mb-md">
        <q-input
          v-model="search"
          clearable
          debounce="500"
          placeholder="Search game"
        >
          <template v-slot:prepend>
            <q-icon name="eva-search-outline" color="grey-5" />
          </template>
        </q-input>
      </div>

      <ChooseGames @selected="onChooseGameSelected" />

      <div class="row">
        <div class="col-8">
          <BillboardList @onClickNew="onClickNewBillboard" :items="billboardStore.adverts" :isLoading="billboardStore.advertsLoading" :pagination="billboardStore.advertsPagination" />
        </div>
      </div>
    </div>

    <q-dialog v-model="rightModal" class="modal-default" :square="true" position="right" full-height>
      <div class="modal-back">
        <div class="modal-back-inner">
          <div class="row items-center justify-between q-mb-lg">
            <div class="col-auto">
              <q-btn flat label="New ad" icon="close" class="text-weight-medium q-px-none icon-gray" :ripple="false" @click="rightModal = false" />
            </div>

            <div>
              <q-btn label="Publish" color="primary" class="text-weight-medium" @click="publishBillboard" />
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

              <!--q-input
                filled
                dense
                placeholder='For example "Axie Infinity"'
                v-model="name"
              /-->

              <q-select filled dense :map-options="true" :emit-value="true" v-model="billboard.game_id" :options="billboardStore.listGames" required />
            </div>

            <div>
              <div class="input-label">
                Content
              </div>
              <q-input
                filled
                class="default-textarea"
                v-model="billboard.name"
                type="textarea"
                placeholder="Text"
              />
            </div>

            <div class="q-mt-lg">
              <div class="q-mb-md">
                <div class="row items-end">
                  <div class="col-auto ">
                    <div class="f2 fw-500 lh08">
                      {{billboard.spots_all}}
                    </div>
                  </div>
                  <div class="col-auto q-ml-xs">
                    <div class="text-grey-8 text-caption">
                      Players
                    </div>
                  </div>
                </div>
              </div>
              <q-slider thumb-size="24px" v-model="billboard.spots_all" :min="1" :max="spots_total" />
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
      billboard_default: null,
      spots_total: 10,
      billboard: {
        game_id: null,
        name: null,
        spots_all: 1
      }
    }
  },
  methods: {
    async publishBillboard () {
      await this.billboardStore.publish(this.billboard)
    },

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
  watch: {
    async $route (to, from) {
      if (to.name === 'billboard-by-game') {
        const slug = to.params.game
        await this.billboardStore.loadAdverts(slug)
      }
    },

    async search (val) {
      this.billboardStore.search(val)
    },

    async 'billboardStore.selectedGame' (val) {
      if (val) {
        this.billboard.game_id = val.id
      }
    },

    async 'billboardStore.published' (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.rightModal = false
      }
    }
  },
  async mounted () {
    await this.billboardStore.loadChooseGames()
    if (this.game) {
      await this.billboardStore.loadAdverts(this.game)
    } else {
      const games = this.billboardStore.chooseGames
      if (games) {
        const firstGame = games[0]
        await this.billboardStore.loadAdverts(firstGame.slug)
      }
    }

    this.billboard_default = JSON.parse(JSON.stringify(this.billboard))
  }
})
</script>
