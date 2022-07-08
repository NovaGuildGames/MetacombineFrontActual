<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <div class="row items-center q-mb-md">
          <div>
            <div class="footer-sb">
              {{item.name}}
            </div>
          </div>

          <div class="q-ml-sm">
            <q-chip v-for="device in item.devices" :key="device" outline color="grey" size="sm">
              {{device}}
            </q-chip>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-auto">
            <div class="row items-center">
              <div class="col-auto q-mr-md">
                <q-avatar size="48px">
                  <img :src="item.avatar" />
                </q-avatar>
              </div>

              <div class="col-auto">
                <div class="row items-center">
                  <div class="f1 font-weight-regular">
                    {{item.user}}
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
                  20 минут назад
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto q-ml-lg">
            <div v-if="!item.spot_current">
              <div class="row items-end">
                <div class="col-auto ">
                  <div class="text-h6 text-weight-bold">
                    {{item.spot_current}}/{{item.spot_all}}
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
                    <div class="circles-wrapper" :style="{width: (item.spot_current)+'rem'}">
                      <div class="circle-inner" v-for="(itemx, index) in item.spot_current" :key="index">
                        <q-avatar class="circle-avatar" size="26px">
                          <img :src="item.avatar" />
                        </q-avatar>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto q-ml-md">
                  <div class="text-grey-8 text-caption">
                    {{item.spot_current}}<span v-if="(item.spot_all - 1) > item.spot_current">/{{item.spot_all}}</span> Players
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

        <div class="q-mt-md">
          <q-btn color="secondary" size="md" class="text-black" unelevated label="Начать игру" />
          <q-btn flat color="primary" class="q-ml-md" size="md" label="Скопировать Discord ссылку" />
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
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['item', 'isLoading'],
  components: {

  },
  setup () {

  }
})
</script>
