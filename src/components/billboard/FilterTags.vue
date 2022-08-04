<template>
  <div>
    <div class="row items-center">
      <div class="col-auto" v-if="filtersCheck.game">
        <q-btn color="grey-4" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="billboardStore.unsetGame" v-if="billboardStore.selectedGame">
          {{billboardStore.selectedGame.name}}
        </q-btn>
      </div>

      <div class="col-auto" v-if="filtersCheck.lang">
        <q-btn :color="filter.lang ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true">
          Language<span v-if="filter.lang">: {{findLabel('langs', filter.lang)}}</span>

          <q-menu fit>
            <q-list dense>
                <q-item clickable v-close-popup v-for="item in billboardStore.langs" :key="item" @click.prevent="updateFilterOption('lang', item.value)">
                  <q-item-section>
                    {{item.label}}
                  </q-item-section>
                </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="col-auto" v-if="filtersCheck.game_type">
        <q-btn :color="filter.game_type ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true">
          Type<span v-if="filter.game_type">: {{findLabel('game_types', filter.game_type)}}</span>

          <q-menu fit>
            <q-list dense>
                <q-item clickable v-close-popup v-for="item in billboardStore.game_types" :key="item" @click.prevent="updateFilterOption('game_type', item.value)">
                  <q-item-section>
                    {{item.label}}
                  </q-item-section>
                </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="col-auto" v-if="filtersCheck.android">
        <q-btn :color="filter.android ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="updateFilterField('android')">
          Android
        </q-btn>
      </div>

      <div class="col-auto" v-if="filtersCheck.ios">
        <q-btn :color="filter.ios ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="updateFilterField('ios')">
          IOS
        </q-btn>
      </div>

      <div class="col-auto" v-if="filtersCheck.desktop">
        <q-btn :color="filter.pc ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="updateFilterField('pc')">
          Desktop
        </q-btn>
      </div>

      <div class="col-auto" v-if="filtersCheck.reset">
        <q-btn color="secondary" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click="resetFilter" v-if="(Object.keys(filter).length > 0) || billboardStore.selectedGame">
          Reset
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>
import _ from 'lodash'
import { defineComponent } from 'vue'
import { useBillboardStore } from 'stores/billboard'

export default defineComponent({
  props: ['currentUser', 'filters'],
  setup () {
    const billboardStore = useBillboardStore()

    return {
      billboardStore
    }
  },
  methods: {
    async resetFilter () {
      this.filter = {}
      this.billboardStore.unsetGame()
    },

    async updateFilterField (field) {
      if (this.filter[field]) {
        delete this.filter[field]
      } else {
        this.filter[field] = true
      }
    },

    async updateFilterOption (field, value) {
      this.filter[field] = value
    },

    findLabel (field, value) {
      const items = this.billboardStore[field]
      const item = _.find(items, (current) => {
        return current.value === value
      })

      if (item) {
        return item.label + ''
      }
    }
  },
  computed: {
    filtersCheck () {
      const filters = this.filters
      const result = {}
      _.each(filters, (item) => {
        result[item] = true
      })

      return result
    }
  },
  data () {
    return {
      filter: {}
    }
  },
  watch: {
    filter: {
      async handler (val) {
        await this.billboardStore.loadAdverts({
          filter: val
        })
      },
      deep: true
    }
  }
})
</script>
