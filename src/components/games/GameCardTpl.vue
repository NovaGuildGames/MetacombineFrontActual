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

        <div class="game-card-tpl__content" :class="{ 'content1': item.id == 8, 'content2': item.id != 8 }">
          <div class="game-card-tpl__title">
            {{item.name}}
          </div>

          <div class="text-caption row game-card-tpl__caption no-wrap q-mt-sm q-mb-xs">
            <div>
              arcade
            </div>
            <div class="q-px-xs">
               ·
            </div>
            <div>
               ethereum
            </div>
          </div>

          <div class="q-gutter-xs">
            <q-badge class="badge-white" outline color="secondary" label="android" />
            <q-badge class="badge-white" outline color="secondary" label="ios" />
          </div>

          <div class="game-card-tpl__buttons all-pointer-events">
            <q-btn color="secondary" class="full-width text-black" unelevated label="More" />
            <q-btn color="secondary" class="full-width text-black" unelevated label="Team search" v-if="item.id != 8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  $padding: 0.72rem;

  .game-card-tpl {
    width: 168px;
    padding-top: 138%;
    position: relative;
    border-radius: 0.75rem;
    overflow: hidden;

    &__platforms {
      display: flex;
      justify-content: flex-end;
      padding-bottom: $padding;
    }

    &__shadow2 {
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
      top: 55%;
      opacity: 1;
      transition: opacity 0.3s ease !important;
    }

    &__platform {
      width: 1.625rem;
      height: 1.625rem;
      border-radius: 50%;
      overflow: hidden;
      background: $secondary;
      z-index: 2;
    }

    &__caption {
      color: rgba(255, 255, 255, 0.5);
    }

    &__shadow {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    }

    &__area {
      padding: $padding;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 2;
    }

    &__buttons {
      opacity: 0;
      position: relative;
      bottom: 0px;
      transition: opacity 0.3s ease !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 1rem;
    }

    &__content {
      position: relative;
      bottom: 0px;
      transition: bottom 0.3s ease !important;

      &.content2 {
        .game-card-tpl__buttons {
          height: 4.375rem;
        }
      }

      &.content1 {
        .game-card-tpl__buttons {
          height: 1.875rem;
        }
      }
    }

    &__title {
      font-size: 1rem;
      font-weight: 700;
      color: white;
      align-self: stretch;
      line-height: 1.1875rem;
    }

    &__shadow {
      opacity: 0;
      transition: opacity 0.3s ease !important;
    }

    &:not(:hover) {
      .game-card-tpl__content {
        &.content1 {
          bottom: -2.4rem;
        }

        &.content2 {
          bottom: -5rem;
        }
      }
    }

    &:hover {
      .game-card-tpl__shadow {
        opacity: 1;
        background: linear-gradient(0deg, rgba(0, 153, 255, 0.5), rgba(0, 153, 255, 0.5)), linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)
      }

      .game-card-tpl__caption {
        color: white !important;
      }

      .game-card-tpl__shadow2 {
        opacity: 0;
      }

      .game-card-tpl__buttons {
        opacity: 1;
      }
    }
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
