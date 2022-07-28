<template>
  <div>
    <div class="row items-center">
      <div class="col-auto">
        <q-btn :color="!filter.archive ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="delete filter.archive">
          Active
        </q-btn>
      </div>

      <div class="col-auto">
        <q-btn :color="filter.archive ? 'grey-4' : 'secondary'" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" :no-ripple="true" @click.prevent="filter.archive = true">
          Archive
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
      filter: {}
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
