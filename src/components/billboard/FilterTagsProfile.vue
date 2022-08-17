<template>
  <div>
    <div class="row items-center">
      <div class="col-auto">
        <q-btn :color="filter.active ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="onFilterActive">
          Active
        </q-btn>
      </div>

      <div class="col-auto">
        <q-btn :color="filter.archive ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="onFilterArchive">
          Archive
        </q-btn>
      </div>

      <div class="col-auto">
        <q-btn :color="filter.applied ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="onFilterApplied">
          My applied
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
  props: ['filters'],
  setup () {
    const billboardStore = useBillboardStore()

    return {
      billboardStore
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
      filter: {
        active: true
      }
    }
  },
  methods: {
    onFilterActive () {
      delete this.filter.archive
      delete this.filter.applied
      this.filter.active = true
    },

    onFilterArchive () {
      delete this.filter.active
      delete this.filter.applied
      this.filter.archive = true
    },

    onFilterApplied () {
      delete this.filter.active
      delete this.filter.archive
      this.filter.applied = true
    }
  },
  watch: {
    filter: {
      async handler (val) {
        await this.billboardStore.loadAdverts({
          filter: this.filter
        })
      },
      deep: true
    }
  }
})
</script>
