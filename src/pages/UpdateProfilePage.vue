<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-lg row justify-between">
        <div class="col">
          <div class="text-h3 text-center">
            Update profile
          </div>
        </div>
      </div>

      <!--pre>
        {{authStore.metapass}}
      </pre-->

      <div v-if="authStore.metapass">
        <!-- Player -->
        <div v-if="authStore.metapass.type == 1" class="row full-width justify-center">
          <div classv-if="type == 1" class="col-12 col-lg-4">
            <q-form
              id="updatePlayerForm"
              enctype="multipart/form-data"
              class="q-gutter-md"
              ref="updatePlayerForm"
            >
                <q-input class="q-mb-md" v-model="authStore.metapass.profile.nickname" placeholder="Nickname*" name="nickname" dense filled :reactive-rules="true" :rules="[ async val => await authStore.validate('nickname', 'Nickname') ]" />
                <q-input class="q-mb-md" v-model="authStore.metapass.profile.discord_nickname" dense placeholder="Discord Nickname#0000 *" name="discord_nickname" :reactive-rules="true" :rules="[ async val => await authStore.validate('discord_nickname', 'Discord nickname') ]" filled/>

                <p class="q-mb-md">Description/Bio*</p>
                <q-editor class="q-mb-md" v-model="authStore.metapass.profile.description" min-height="6rem" />
                <input type="hidden" v-model="authStore.metapass.profile.description" name="description" />

                <q-select class="q-mb-md" clearable v-model="authStore.metapass.profile.location_id" :emit-value="true" dense placeholder="Location" name="location_id" :options="appStore.lists.locations" @filter="(val, update) => filterUpdate(val, update, 'locations')" use-input use-chips stack-label map-options filled/>

                <q-select class="q-mb-md" clearable v-model="authStore.metapass.profile.devices" :emit-value="true" dense placeholder="Devices" name="devices[]" :options="appStore.lists.devices" @filter="(val, update) => filterUpdate(val, update, 'devices')" use-input multiple use-chips stack-label map-options filled/>

                <q-select class="q-mb-md" clearable v-model="authStore.metapass.profile.languages" :emit-value="true" dense placeholder="Languages" name="languages[]" :options="appStore.lists.languages" @filter="(val, update) => filterUpdate(val, update, 'languages')" use-input multiple use-chips stack-label map-options filled/>

                <!--q-select class="q-mb-md" clearable v-model="register.player.skills" dense placeholder="Skills" name="skills[]" :options="appStore.lists.skills" @filter="(val, update) => filterUpdate(val, update, 'skills')" multiple use-input use-chips stack-label map-options filled/>
                <q-select class="q-mb-md" clearable v-model="register.player.games" dense placeholder="Games" name="games[]" :options="appStore.lists.games" @filter="(val, update) => filterUpdate(val, update, 'games')" multiple use-input use-chips stack-label map-options filled/>
                <q-select class="q-mb-md" clearable v-model="register.player.statuses" dense placeholder="Statuses" name="statuses[]" :options="appStore.lists['player-statuses']" @filter="(val, update) => filterUpdate(val, update, 'player-statuses')" multiple use-input use-chips stack-label map-options filled/-->

              <div class="q-mb-md">
                <q-btn class="full-width" color="primary" label="Update" @click="updatePlayerProfile()" />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'
import { useAuthStore } from 'stores/app/auth'

export default defineComponent({
  name: 'RegisterPage',
  setup () {
    const appStore = useAppStore()
    const authStore = useAuthStore()

    return {
      appStore,
      authStore
    }
  },
  data () {
    return {
      register: {
        player: {
          description: ''
        },
        game: {
          requirements: null,
          nft: false,
          p2e: false,
          f2p: false
        },
        guild: {}
      }
    }
  },
  methods: {
    async filterUpdate (val, update, key) {
      update(async () => {
        this.appStore.loadList(key, val)
      })
    },

    async updatePlayerProfile () {
      const form = this.$refs.updatePlayerForm
      const formData = new FormData(form.$el)
      await this.authStore.updatePlayerProfile(formData)
    }
  },
  async mounted () {
    this.appStore.loadLists()
  }
})
</script>
