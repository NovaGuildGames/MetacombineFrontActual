<template>
  <div class="q-my-lg q-py-lg">
    <swiper
      :slidesPerView="6"
      :spaceBetween="38"
      :draggable="true"
      :mousewheel="{forceToAxis: true}"
      :modules="modules"
      :virtual="{
        addSlidesBefore: 4,
        addSlidesAfter: 6,
        cache: true,
        enabled: true
      }"
      @reachEnd="onReachEnd"
    >
      <swiper-slide v-for="item in elements" :key="item.id" :virtualIndex="item.id">
        <GameCardTpl :item="item" @selected="$emit('selected', item)" :isLoading="billboardStore.chooseGamesLoading" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
  .swiper-slide {
    width: auto !important;
  }

  .swiper {
    overflow: visible !important;
  }
</style>

<script>
const SKELETON_COUNT = 16

import { useBillboardStore } from 'stores/billboard'
import GameCardTpl from 'components/games/GameCardTpl'
import { defineComponent } from 'vue'

import { Navigation, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

export default defineComponent({
  emits: ['selected'],
  components: {
    GameCardTpl,
    Swiper,
    SwiperSlide
  },
  setup () {
    const billboardStore = useBillboardStore()

    return {
      billboardStore,
      modules: [Navigation, Virtual]
    }
  },
  data () {
    return {
      swiper: null
    }
  },
  methods: {
    async onReachEnd () {
      await this.billboardStore.loadChooseGames(true)
    }
  },
  computed: {
    elements () {
      if (this.billboardStore.chooseGamesLoading) {
        return Array.from(Array(SKELETON_COUNT).keys())
      } else {
        return this.billboardStore.chooseGames
      }
    }
  }
})
</script>
