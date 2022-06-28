<template>
  <div class="game-card-tpl cursor-pointer" @click="$emit('selected', item)">
    <q-skeleton class="abs" type="rect" v-if="isLoading">
      <q-inner-loading :showing="true">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-skeleton>

    <div v-if="!isLoading" class="game-card-tpl__inner abs rounded-borders" transition-show="jump-down">
      <q-img
        class="game-card-tpl__bg abs"
        loading="lazy"
        :src="item.logo"
        :fit="cover"
        spinner-color="white"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .game-card-tpl {
    width: 200px;
    padding-top: 138%;
    position: relative;
  }
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['item', 'isLoading'],
  emits: ['selected'],
  setup () {
    return {}
  }
})
</script>
