<template>
  <div>
    <a :href="billboardStore.discordLink" ref="discordLink"></a>
    <template v-if="!billboardStore.advertsFirstPage">
      <div class="row items-center">
        <div class="col">
          <h3 class="text-h3">
            Go play
          </h3>
        </div>
        <div class="col-auto" v-if="authStore.isLoggedIn">
          <q-btn color="primary" @click="$emit('onClickNew')">
            <q-icon name="fa-solid fa-plus" class="q-mr-xs" /> New
          </q-btn>
        </div>
      </div>

      <FilterTags />
    </template>

    <div class="q-mt-lg">
      <div v-if="!isLoading">
        <div v-if="items.length > 0">
          <div class="card-md" v-for="item in items" :key="item">
            <BillboardTpl :item="item" :isLoading="isLoading" :showButtons="authStore.isLoggedIn" />
          </div>
        </div>
        <div v-else>
          <h4>Нет объявление в этой игре</h4>
        </div>
      </div>
      <div v-else>
        <q-spinner
          color="primary"
          size="5em"
        />
      </div>
    </div>

    <Pagination :links="pagination" :isLoading="isLoading" @onPaginate="onPaginate" />
  </div>
</template>

<script>
import BillboardTpl from './BillboardTpl'
import { useAuthStore } from 'stores/app/auth'
import { useBillboardStore } from 'stores/billboard'
import Pagination from 'src/components/common/Pagination'
import FilterTags from './FilterTags'
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['items', 'pagination', 'isLoading', ''],
  emits: ['onClickNew'],
  components: {
    BillboardTpl,
    FilterTags,
    Pagination
  },
  setup () {
    const authStore = useAuthStore()
    const billboardStore = useBillboardStore()

    return {
      authStore,
      billboardStore
    }
  },
  methods: {
    onPaginate (url) {
      this.billboardStore.loadAdverts(url)
    }
  }
})
</script>
