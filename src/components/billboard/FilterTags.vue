<template>
  <div>
    <q-btn @click="$emit('click', item)" color="secondary" rounded unelevated class="q-mr-md q-mb-sm text-black text-weight-medium" v-for="item in items" :key="item" :no-ripple="true">{{item}}</q-btn>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['items', 'isLoading'],
  emits: ['click'],
  components: {

  },
  setup () {

  }
})
</script>
