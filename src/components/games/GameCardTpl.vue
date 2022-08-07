<template>
  <div class="game-card-tpl cursor-pointer non-selectable" @click="$emit('selected', item)">
    <q-skeleton class="abs no-pointer-events" type="rect" v-if="isLoading">
      <q-inner-loading :showing="true">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-skeleton>

    <div v-if="!isLoading" class="game-card-tpl__inner abs rounded-borders no-pointer-events" transition-show="jump-down">
      <q-img
        class="game-card-tpl__bg abs"
        loading="lazy"
        :src="item.logo"
        fit="cover"
        spinner-color="white"
      />

      <div class="game-card-tpl__shadow2"></div>
      <div class="game-card-tpl__shadow abs"></div>

      <div class="game-card-tpl__area abs">
        <div class="game-card-tpl__platforms">
          <q-img
            :src="item.blockchain_image"
            spinner-color="white"
            class="game-card-tpl__platform"
          />
        </div>

        <div class="game-card-tpl__content content1"> <!-- content2 если 2 кнопки -->
          <div class="game-card-tpl__title">
            {{item.name}}
          </div>

          <div class="text-caption row game-card-tpl__caption q-mt-sm q-mb-xs lh12" v-if="item.genres && item.genres.length > 0">
            <template v-for="(genre, genre_index) in item.genres" :key="genre_index">
              <div class="q-px-xs" v-if="genre_index !== 0">
                ·
              </div>
              <div class="text-nowrap">
                {{genre}}
              </div>
            </template>
          </div>

          <div class="q-gutter-xs" v-if="item.devices && item.devices.length > 0">
            <q-badge class="badge-white" outline color="secondary" :label="device" v-for="(device, device_index) in item.devices.slice(0, 4)" :key="device_index" />
          </div>

          <div class="game-card-tpl__buttons all-pointer-events">
            <q-btn color="secondary" class="full-width text-black" unelevated label="More" v-if="item.website" @click.prevent="goWebsite(item)" />
            <!--q-btn color="secondary" class="full-width text-black" unelevated label="Team search" v-if="item.id != 8" /-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['item', 'isLoading'],
  emits: ['selected'],
  setup () {
    return {}
  },
  methods: {
    goWebsite (item) {
      window.open(item.website, '_BLANK')
    }
  }
})
</script>
