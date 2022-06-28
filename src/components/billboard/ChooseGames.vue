<template>
  <div>
    <swiper
      :slidesPerView="'auto'"
      :spaceBetween="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="item in elements" :key="item">
        <GameCardTpl :item="item" @selected="$emit('selected', item)" :isLoading="isLoading"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
  .swiper-slide {
    width: auto !important;
  }
</style>

<script>
const SKELETON_COUNT = 3

import GameCardTpl from 'components/games/GameCardTpl'
import { defineComponent } from 'vue'

import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

export default defineComponent({
  props: ['items', 'isLoading'],
  emits: ['selected'],
  components: {
    GameCardTpl,
    Swiper,
    SwiperSlide
  },
  setup () {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation]
    }
  },
  computed: {
    elements () {
      if (this.isLoading) {
        return Array.from(Array(SKELETON_COUNT).keys())
      } else {
        return this.items
      }
    }
  }
})
</script>
