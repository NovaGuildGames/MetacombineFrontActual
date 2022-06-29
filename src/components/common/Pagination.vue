<template>
  <div>
    <div class="pagination-outer" v-if="links && links.length > 3">
      <q-btn v-for="link in links" v-show="detectShow(link)" :key="link" padding="none" :flat="!link.active" :unelevated="link.active" class="paging-btn text-black" color="secondary" :icon="detectIcon(link)" :label="detectLabel(link)" :disabled="!link.url" @click="paginate(link)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.paging-btn {
  border-radius: 1rem;
  width: 1.875rem;
  height: 1.875rem;
  margin-right: 0.5rem;
}

.pagination-outer {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>

<script>
export default {
  props: ['links'],
  emits: ['onPaginate'],
  name: 'PaginationComponent',
  setup () {

  },
  methods: {
    paginate (item) {
      if (!item.url) return
      this.$emit('onPaginate', item.url)
    },
    detectLabel (item) {
      if (item.label.match(/\d/ui)) {
        return item.label
      }
    },
    detectShow (item) {
      if (item.label === 'pagination.previous') {
        return false
      }

      return true
    },
    detectIcon (item) {
      if (item.label === 'pagination.previous') {
        return 'fa-solid fa-chevron-left'
      } else if (item.label === 'pagination.next') {
        return 'fa-solid fa-chevron-right'
      }
    }
  }
}
</script>
