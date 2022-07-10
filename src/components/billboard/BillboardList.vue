<template>
  <div>
    <div class="row items-center">
      <div class="col">
        <h3 class="text-h3">
          Go Play
        </h3>
      </div>
      <div>
        <q-btn color="primary" @click="$emit('onClickNew')">
          <q-icon name="fa-solid fa-plus" class="q-mr-xs" /> New
        </q-btn>
      </div>
    </div>

    <FilterTags class="card-md" :items="['Игра', 'Online', 'Big party', 'Last player', 'Фильтр']" @click="onFilterSelect" />

    <div class="q-mt-lg">
      <div class="card-md" v-for="item in items" :key="item">
        <BillboardTpl :item="item" :isLoading="isLoading" />
      </div>
    </div>

    <Pagination :links="pagination" :isLoading="isLoading" />
  </div>
</template>

<style scoped lang="scss">
  .card-md {
    margin-bottom: 2.5rem;
  }
</style>

<script>
import BillboardTpl from './BillboardTpl'
import Pagination from 'src/components/common/Pagination'
import FilterTags from './FilterTags'
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['items', 'pagination', 'isLoading'],
  emits: ['onClickNew'],
  components: {
    BillboardTpl,
    FilterTags,
    Pagination
  },
  methods: {
    onFilterSelect (item) {
      console.log(item)
    }
  }
})
</script>
