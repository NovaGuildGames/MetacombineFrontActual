<template>
  <q-page class="q-pa-lg">
    <div class="q-py-md row justify-between">
      <div class="text-h4">
        Games
      </div>
      <q-btn :ripple="false" flat rounded color="primary" label="All games" />
    </div>

    <div class="q-mb-md">
      <q-input
        v-model="search"
        debounce="500"
        placeholder="Search game"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <swiper
      :slidesPerView="'auto'"
      :spaceBetween="20"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="item in appStore.slides" :key="item">
        <div class="slide-inner">

        </div>
      </swiper-slide>
    </swiper>

    <pre>
      {{slides}}
    </pre>
    <q-btn @click="add">Add slide</q-btn>
  </q-page>
</template>

<style scoped lang="scss">
  .slide-inner {
    width: 150px;
    height: 250px;
    background: red;
  }

  .swiper-slide {
    width: auto !important;
  }
</style>

<script>
import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default defineComponent({
  name: 'IndexPage',
  components: {
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

    const appStore = useAppStore()

    return {
      appStore,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y]
    }
  },
  methods: {
    async add () {
      await this.appStore.add()
    }
  }
})
</script>
