<template>
  <div>
    <div class="row no-wrap">
      <div class="col">
        <q-card class="my-card">
          <q-card-section>
            <div class="row items-center justify-between q-mb-md" v-if="item.name_game">
              <div class="col-auto">
                <div class="items-center my-card__header">
                  <div>
                    <div class="footer-sb">
                      {{item.name_game}}
                    </div>
                  </div>

                  <div class="q-ml-sm card__devices" v-if="item.game_devices">
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

            <div class="card__body items-center">
              <div class="col-auto">
                <div class="row items-center">
                  <div class="col-auto q-mr-md">
                    <q-avatar size="48px">
                      <img :src="item.logo" v-if="item.logo" />
                      <img src="~assets/no-avatar.svg" v-else />
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
                      {{$filters.dateMy(item.created_at)}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto card__players">
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
                        <div class="circles-wrapper" :class="{ isOne: logosShow.length <= 1 }" :style="{width: (logosShow.length+1)+'rem'}">
                          <div class="circle-inner" v-for="(itemx, index) in logosShow" :key="index">
                            <q-avatar class="circle-avatar" size="32px" v-if="index < 3">
                              <img :src="itemx" v-if="itemx" />
                              <img class="testx" src="~assets/no-avatar.svg" v-else />
                            </q-avatar>
                            <div class="circle-avatar circle-num" size="32px" v-else>
                              +{{logosShow.length-3}}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto q-ml-md">
                      <div class="text-grey-8 text-caption">
                        {{item.spots_full}}<span v-if="item.spots_full > 1">/{{item.spots_all}}</span> Players
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-mt-xs" v-if="item.spots_all > 0">
                  <q-linear-progress :value="item.spots_full / item.spots_all" class="q-mt-xs progress-line" rounded />
                </div>
              </div>
            </div>

            <div class="q-my-md">
              <div class="footer-sb q-mt-sm" v-if="item.advert_name">
                {{item.advert_name}}
              </div>

              <div class="f1 text-black">
                {{item.text}}
              </div>
            </div>

            <div class="q-mt-md">
              <q-btn color="secondary" size="md" class="text-black" unelevated label="Go play" @click="goPlay" />
              <!--q-btn flat color="primary" class="q-ml-md" size="md" label="Copy Discord link" v-if="('L' + item.id) in billboardStore.discordLinks" :href="billboardStore.discordLinks['L' + item.id]" target="_BLANK" /-->
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-auto" v-if="showDelete && isMine">
        <div class="cursor-pointer item-action" @click.prevent="deleteItem(item)">
          <q-icon name="fa-solid fa-trash-can" size="1rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')
import { useAuthStore } from 'stores/app/auth'
import { useBillboardStore } from 'stores/billboard'
import { defineComponent } from 'vue'
import { copyToClipboard } from 'quasar'

export default defineComponent({
  props: ['item', 'isLoading', 'showButtons', 'showDelete'],
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
      if (this.authStore.isLoggedIn) {
        await this.billboardStore.goPlay(this.item)
      } else {
        await this.$router.push({ name: 'register' })
      }
    },

    async copyLink () {
      copyToClipboard(this.item.discord_link)
    },

    async deleteItem (item) {
      const result = confirm('delete billboard?')
      if (result) {
        await this.billboardStore.deleteItem(item.id)
      }
    }
  },
  computed: {
    isMine () {
      const metapass = this.authStore.metapass
      if (!metapass) return false
      if (metapass.address === this.item.author_metapass) return true
      return false
    },

    logosShow () {
      const logos = this.item.logos.slice(0, 4)
      return logos
    }
  }
})
</script>
