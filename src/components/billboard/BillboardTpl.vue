<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <div class="row items-center justify-between q-mb-md" v-if="item.name_game">
          <div class="col-auto">
            <div class="row items-center">
              <div>
                <div class="footer-sb">
                  {{item.name_game}}
                </div>
              </div>

              <div class="q-ml-sm" v-if="item.game_devices">
                <q-chip v-for="device in item.game_devices" :key="device" outline color="grey" size="sm">
                  {{device}}
                </q-chip>
              </div>
            </div>
          </div>

          <div class="col-auto" v-if="isMine">
            <q-chip outline color="primary" size="sm">
              Yours
            </q-chip>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-auto">
            <div class="row items-center">
              <div class="col-auto q-mr-md">
                <q-avatar size="48px">
                  <img :src="item.logo" />
                </q-avatar>
              </div>

              <div class="col-auto">
                <div class="row items-center">
                  <div class="f1 font-weight-regular">
                    {{item.author}}
                  </div>
                  <div class="q-ml-xs" v-if="item.verified">
                    <q-icon name="eva-checkmark-outline" class="text-primary" />
                  </div>
                  <div class="q-ml-xs" v-if="item.guild">
                    <div class="f1 font-weight-regular text-grey">
                      · {{item.guild}}
                    </div>
                  </div>
                </div>

                <div class="text-grey-8 text-caption q-mt-xs">
                  {{moment(item.created_at).fromNow()}}
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto q-ml-lg">
            <div v-if="!item.spots_full">
              <div class="row items-end">
                <div class="col-auto ">
                  <div class="text-h6 text-weight-bold">
                    0/{{item.spots_all}}
                  </div>
                </div>
                <div class="col-auto q-ml-xs">
                  <div class="text-grey-8 text-caption">
                    Players
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row items-center">
                <div class="col-auto ">
                  <div class="text-h6 text-weight-bold">
                    <div class="circles-wrapper" :style="{width: (item.logos.length)+'rem'}">
                      <div class="circle-inner" v-for="(itemx, index) in item.logos" :key="index">
                        <q-avatar class="circle-avatar" size="26px">
                          <img :src="itemx" />
                        </q-avatar>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto q-ml-md">
                  <div class="text-grey-8 text-caption">
                    {{item.spots_full}}<span v-if="(item.spots_full - 1) > item.spots_full">/{{item.spots_all}}</span> Players
                  </div>
                </div>
              </div>
            </div>

            <div v-if="item.spot_all > 0">
              <q-linear-progress :value="item.spot_current / item.spot_all" class="q-mt-xs progress-line" rounded />
            </div>
          </div>
        </div>

        <div class="f1 q-my-md text-black">
          {{item.text}}
        </div>

        <div v-if="showButtons" class="q-mt-md">
          <q-btn color="secondary" size="md" class="text-black" unelevated label="Go play" @click="goPlay" />
          <q-btn flat color="primary" class="q-ml-md" size="md" label="Copy Discord link" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
  .progress-line {
    min-width: 11rem;
  }

  .circle-avatar {
    position: absolute;
    top: -13px;
    left: -13px;
    width: 26px;
  }

  .circles-wrapper {
    display: flex;
    width: 9rem;
    height: 26px;
    margin-left: 6.5px;
    white-space: nowrap !important;
    flex-wrap: nowrap !important;
    align-items: center;
    justify-content: space-around;
  }

  .circle-inner {
    position: relative;
    width: 0px;
    height: 0px;
  }
</style>

<script>
const moment = require('moment')
import { useAuthStore } from 'stores/app/auth'
import { useBillboardStore } from 'stores/billboard'
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['item', 'isLoading', 'showButtons'],
  components: {

  },
  setup () {
    const authStore = useAuthStore()
    const billboardStore = useBillboardStore()

    return {
      authStore,
      billboardStore,
      moment
    }
  },
  methods: {
    async goPlay () {
      await this.billboardStore.goPlay(this.item.id)
    }
  },
  computed: {
    isMine () {
      const metapass = this.authStore.metapass
      if (!metapass) return false
      if (metapass.address === this.item.author_metapass) return true
      return false
    }
  }
})
</script>
