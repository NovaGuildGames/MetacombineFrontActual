<template>
  <div>
    <q-dialog v-model="billboardStore.isModalOpened" class="modal-default" :square="true" position="right" full-height>
      <div class="modal-back">
        <div class="modal-back-inner">
          <div class="row items-center justify-between q-mb-lg">
            <div class="col-auto">
              <q-btn flat label="New ad" icon="close" class="text-weight-medium q-px-none icon-gray" :ripple="false" @click="closeModal" />
            </div>

            <div>
              <q-btn label="Publish" color="primary" class="text-weight-medium" @click="publishBillboard" />
            </div>
          </div>

          <q-separator />

          <q-form class="q-gutter-md q-mt-lg">
            <div>
              <div class="input-label">
                Language
              </div>

              <q-select filled dense :map-options="true" :emit-value="true" v-model="billboard.language_id" :options="billboardStore.langs" required />
            </div>

            <div>
              <div class="input-label">
                Name game
              </div>

              <q-select filled dense :map-options="true" :emit-value="true" v-model="billboard.game_id" :options="appStore.lists.games" @filter="(val, update) => filterUpdate(val, update, 'games')" use-input required />
            </div>

            <div>
              <div class="input-label">
                Options
              </div>

              <q-toggle
                v-model="billboard.nft"
                label="NFT"
              />

              <q-toggle
                v-model="billboard.f2p"
                label="F2P"
              />

              <q-toggle
                v-model="billboard.p2e"
                label="P2E"
              />
            </div>

            <div>
              <div class="input-label">
                Content
              </div>
              <q-input
                filled
                class="default-textarea"
                v-model="billboard.name"
                type="textarea"
                placeholder="Text"
              />
            </div>

            <div class="q-mt-lg">
              <div class="q-mb-md">
                <div class="row items-end">
                  <div class="col-auto ">
                    <div class="f2 fw-500 lh08">
                      {{billboard.spots_all}}
                    </div>
                  </div>
                  <div class="col-auto q-ml-xs">
                    <div class="text-grey-8 text-caption">
                      Players
                    </div>
                  </div>
                </div>
              </div>
              <q-slider thumb-size="24px" v-model="billboard.spots_all" :min="1" :max="spots_total" />
            </div>
          </q-form>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'
import { useBillboardStore } from 'stores/billboard'

export default defineComponent({
  setup () {
    const appStore = useAppStore()
    const billboardStore = useBillboardStore()

    return {
      appStore,
      billboardStore
    }
  },
  methods: {
    async closeModal () {
      await this.billboardStore.closeModal()
    },

    async filterUpdate (val, update, key) {
      update(async () => {
        this.appStore.loadList(key, val)
      })
    },

    async publishBillboard () {
      await this.billboardStore.publish(this.billboard)
      _.each(this.billboardDefault, (val, key) => {
        if (key === 'game_id') return
        this.billboard[key] = val
      })
    }
  },
  data () {
    return {
      billboardDefault: null,
      spots_total: 10,
      billboard: {
        game_id: null,
        language_id: 44,
        nft: false,
        p2e: false,
        f2p: false,
        name: null,
        spots_all: 1
      }
    }
  },
  mounted () {
    this.billboardDefault = JSON.parse(JSON.stringify(this.billboard || {}))
  },
  watch: {
    async 'billboardStore.selectedGame' (val) {
      if (val) {
        this.billboard.game_id = val.id
      }
    }
  }
})
</script>
