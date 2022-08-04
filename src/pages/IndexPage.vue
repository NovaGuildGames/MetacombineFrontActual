<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <div class="text-h3">
          Games
        </div>
        <!--q-btn :ripple="false" flat rounded color="primary" class="text-bold" label="All games" /-->
      </div>

      <template v-if="!billboardStore.advertsFirstPage">
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
      </template>

      <div class="row">
        <div class="col-8">
          <template v-if="!billboardStore.advertsFirstPage">
            <div class="row items-center">
              <div class="col">
                <h3 class="text-h3">
                  Billboard
                </h3>
              </div>
              <div class="col-auto" v-if="authStore.isLoggedIn">
                <q-btn color="primary" @click="onClickNewBillboard">
                  <q-icon name="fa-solid fa-plus" class="q-mr-xs" /> New
                </q-btn>
              </div>
              <div class="col-auto" v-else>
                <q-btn color="primary" @click="$router.push({name: 'register'})">
                  <q-icon name="fa-solid fa-plus" class="q-mr-xs" /> New
                </q-btn>
              </div>
            </div>

            <FilterTags :filters="['game', 'lang', 'game_type', 'android', 'ios', 'desktop', 'reset']" />
          </template>

          <div class="q-mt-lg">
            <div v-if="!billboardStore.advertsLoading">
              <div v-if="billboardStore.adverts.length > 0">
                <div class="card-md" v-for="item in billboardStore.adverts" :key="item">
                  <BillboardTpl :item="item" :isLoading="billboardStore.advertsLoading" :showButtons="authStore.isLoggedIn" />
                </div>
              </div>
              <div v-else>
                <h4>No results</h4>
              </div>
            </div>
            <div v-else>
              <q-spinner
                color="primary"
                size="5em"
              />
            </div>
          </div>

          <Pagination :links="billboardStore.advertsPagination" :isLoading="billboardStore.advertsLoading" @onPaginate="onPaginate" />
        </div>
      </div>

      <PublishModal />
    </div>
  </q-page>
</template>

<script>
import _ from 'lodash'
import ChooseGames from 'components/billboard/ChooseGames'
import PublishModal from 'components/billboard/PublishModal'
import BillboardTpl from 'components/billboard/BillboardTpl'
import FilterTags from 'components/billboard/FilterTags'
import Pagination from 'components/common/Pagination'
import { useBillboardStore } from 'stores/billboard'
import { useAuthStore } from 'stores/app/auth'

import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ChooseGames,
    BillboardTpl,
    Pagination,
    FilterTags,
    PublishModal
  },
  props: [
    'game'
  ],
  setup () {
    const appStore = useAppStore()
    const authStore = useAuthStore()
    const billboardStore = useBillboardStore()

    return {
      appStore,
      authStore,
      billboardStore
    }
  },
  data () {
    return {
      search: null,
      billboard_default: null,
      spots_total: 10,
      billboard: {
        game_id: null,
        language_id: 44,
        nft: false,
        p2e: false,
        f2p: false,
        name: null,
        spots_all: 1
      }
    }
  },
  methods: {
    onPaginate (url) {
      this.billboardStore.loadAdverts(url)
    },

    async filterUpdate (val, update, key) {
      update(async () => {
        this.appStore.loadList(key, val)
      })
    },

    async publishBillboard () {
      await this.billboardStore.publish(this.billboard)
      const defaultObj = window.billboard_default
      _.each(defaultObj, (val, key) => {
        if (key === 'game_id') return
        this.billboard[key] = val
      })
    },

    async onChooseGameSelected (item) {
      await this.billboardStore.setCurrentGame(item)
      await this.billboardStore.loadAdverts()
    },

    onClickNewBillboard () {
      this.billboardStore.openModal()
    }
  },
  watch: {
    async search (val) {
      this.billboardStore.search(val)
    },

    async 'billboardStore.selectedGame' (val) {
      if (val) {
        this.billboard.game_id = val.id
      }
    }
  },
  async mounted () {
    await this.billboardStore.setCurrentUser(null)
    window.billboard_default = JSON.parse(JSON.stringify(this.billboard))
    await this.billboardStore.loadChooseGames()
    await this.billboardStore.loadAdverts()
  }
})
</script>
