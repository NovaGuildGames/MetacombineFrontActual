<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-lg row justify-between">
        <div class="col">
          <div class="text-h3 text-center">
            Welcome to MetaCombine
          </div>
        </div>
      </div>

      <div v-if="!authStore.isLoading">
        <!--div v-if="!authStore.address && !authStore.metapass">
          <p>
            Вы еще не подключились к метапасс, для регистрации подключитесь (кнопка наверху)
          </p>
        </div-->
        <!--div v-if="authStore.metapass">
          <p>
            Вы уже зарегистрированы в системе
          </p>
        </div-->
        <div class="text-center">
          <p class="q-mb-md">
            If you want to continue please connect. You need to have metamask installed
          </p>
          <q-btn color="primary" v-if="!authStore.metapass" @click="authStore.connect">
            Connect
          </q-btn>
        </div>
        <div v-if="authStore.address && !authStore.metapass">
          <!--div v-if="!type">
            <div class="row justify-center q-gutter-xl col-2 q-mt-sm">
              <div class="column">
                <q-btn icon="person" stack size="40px" flat @click="type = 1" />
                <div class="text-subtitle2 text-center">Игрок</div>
              </div>
              <div class="column">
                <q-btn icon="sports_esports" stack size="40px" flat @click="type = 2" />
                <div class="text-subtitle2 text-center">Игра</div>
              </div>
              <div class="column">
                <q-btn icon="groups" stack size="40px" flat @click="type = 3"/>
                <div class="text-subtitle2 text-center">Гильдия</div>
              </div>
            </div>
          </div-->

          <!-- Игрок -->
          <div v-if="type == 1" class="row full-width justify-center">
            <div class="col-12 col-lg-4">
              <q-form
                id="registerPlayerForm"
                enctype="multipart/form-data"
                class="q-gutter-md"
                ref="registerPlayerForm"
              >
                <div>
                  <q-select class="q-mb-md" v-model="type" :options="types" dense map-options emit-value filled/>
                  <q-input class="q-mb-md" v-model="register.player.nickname" placeholder="Nickname*" name="nickname" dense filled :rules="[ async val => await authStore.validate('nickname', 'Nickname') ]" />
                  <q-input class="q-mb-md" v-model="register.player.discord_nickname" dense placeholder="Discord Nickname*" name="discord_nickname" :rules="[ async val => await authStore.validate('discord_nickname', 'Discord nickname') ]" filled/>
                </div>

                <div v-if="showMorePlayer">
                  <q-file class="q-mb-md" name="logo" v-model="register.player.logo" accept=".jpg, .png" filled dense label="Avatar">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>

                  <p class="q-mb-md">Description/Bio*</p>
                  <q-editor class="q-mb-md" v-model="register.player.description" min-height="6rem" />
                  <input type="hidden" v-model="register.player.description" name="description" />

                  <q-select class="q-mb-md" clearable v-model="register.player.location_id" dense placeholder="Location" name="location_id" :options="appStore.lists.locations" @filter="(val, update) => filterUpdate(val, update, 'locations')" use-input filled/>
                  <q-select class="q-mb-md" clearable v-model="register.player.devices" dense placeholder="Devices" name="devices[]" :options="appStore.lists.devices" @filter="(val, update) => filterUpdate(val, update, 'devices')" use-input multiple use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.player.skills" dense placeholder="Skills" name="skills[]" :options="appStore.lists.skills" @filter="(val, update) => filterUpdate(val, update, 'skills')" multiple use-input use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.player.games" dense placeholder="Games" name="games[]" :options="appStore.lists.games" @filter="(val, update) => filterUpdate(val, update, 'games')" multiple use-input use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.player.statuses" dense placeholder="Statuses" name="statuses[]" :options="appStore.lists['player-statuses']" @filter="(val, update) => filterUpdate(val, update, 'player-statuses')" multiple use-input use-chips stack-label map-options filled/>
                </div>

                <div class="q-mb-md">
                  <q-btn class="full-width" color="primary" label="Sign Up" @click="onRegister('registerPlayerForm')" />
                </div>
                <div class="q-mb-md">
                  <q-btn class="full-width" color="primary" flat :label="showMorePlayer ? 'Sign Up with short-filling' : 'Sign Up with full-filling'" @click="showMorePlayer = !showMorePlayer" />
                </div>
              </q-form>
            </div>
          </div>

          <!-- Игра -->
        <div v-if="type == 2" class="row full-width justify-center">
          <div class="col-12 col-lg-4">
              <q-form
              id="registerGameForm"
              enctype="multipart/form-data"
              class="q-gutter-md"
              ref="registerPGameForm"
              >
              <div>
                  <q-select class="q-mb-md" v-model="type" :options="types" dense map-options emit-value filled/>
                  <q-input class="q-mb-md" v-model="register.game.name" placeholder="Name*" name="name" dense filled :rules="[ async val => await authStore.validate('name', 'Name') ]" />
                  <q-input class="q-mb-md" v-model="register.game.discord_nickname" dense placeholder="Discord Nickname*" name="discord_nickname" :rules="[ async val => await authStore.validate('discord_nickname', 'Discord nickname') ]" filled/>
              </div>

              <div v-if="showMoreGame">
                  <q-file class="q-mb-md" name="logo" v-model="register.game.logo" accept=".jpg, .png" dense filled label="Logo">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>

                  <q-select class="q-mb-md" clearable v-model="register.game.main_blockchain" dense placeholder="Main blockchain" name="main_blockchain" :options="appStore.lists.blockchains" @filter="(val, update) => filterUpdate(val, update, 'blockchains')" use-input map-options filled/>

                  <p class="q-mb-md">Requirements</p>
                  <q-editor class="q-mb-md" v-model="register.game.requirements" min-height="12rem" />
                  <input type="hidden" v-model="register.game.requirements" name="description" />

                  <q-select class="q-mb-md" clearable v-model="register.game.stage" dense placeholder="Stage" name="stage" :options="appStore.lists['game-stages']" @filter="(val, update) => filterUpdate(val, update, 'game-stages')" map-options filled/>
                  <div>
                    <q-toggle class="q-mb-md" v-model="register.game.nft" dense label="NFT Support" name="nft" />
                  </div>
                  <div>
                    <q-toggle class="q-mb-md" v-model="register.game.p2e" dense label="P2E Support" name="p2e" />
                  </div>
                  <div>
                    <q-toggle class="q-mb-md" v-model="register.game.f2p" dense label="F2P Support" name="f2p" />
                  </div>

                  <q-select class="q-mb-md" clearable v-model="register.game.tickers" dense placeholder="Tickers" name="tickers[]" @filter="(val, update) => filterUpdate(val, update, 'tickers')" use-input input-debounce="0" new-value-mode="add-unique" multiple use-chips stack-label map-options filled/>

                  <q-file class="q-mb-md" name="screenshots[]" v-model="register.game.screenshots" multiple accept=".jpg, .png" filled dense label="Screenshots">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>

                  <q-select class="q-mb-md" clearable v-model="register.game.statuses" dense placeholder="Search for" name="statuses[]" :options="appStore.lists['game-statuses']" @filter="(val, update) => filterUpdate(val, update, 'game-statuses')" use-input multiple use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.game.genres" dense placeholder="Genres" name="genres[]" :options="appStore.lists.genres" @filter="(val, update) => filterUpdate(val, update, 'genres')" use-input multiple use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.game.languages" dense placeholder="Languages" name="languages[]" :options="appStore.lists.languages" @filter="(val, update) => filterUpdate(val, update, 'languages')" use-input multiple use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.player.devices" dense placeholder="Devices" name="devices[]" :options="appStore.lists.devices" @filter="(val, update) => filterUpdate(val, update, 'devices')" use-input multiple use-chips stack-label map-options filled/>
                  <q-select class="q-mb-md" clearable v-model="register.player.exchanges" dense placeholder="Exchanges" name="exchanges[]" :options="appStore.lists.exchanges" @filter="(val, update) => filterUpdate(val, update, 'exchanges')" use-input multiple use-chips stack-label map-options filled/>
              </div>

              <div class="q-mb-md">
                  <q-btn class="full-width" color="primary" label="Sign Up" @click="onRegister('registerGameForm')" />
              </div>
              <div class="q-mb-md">
                  <q-btn class="full-width" color="primary" flat :label="showMoreGame ? 'Sign Up with short-filling' : 'Sign Up with full-filling'" @click="showMoreGame = !showMoreGame" />
              </div>
              </q-form>
          </div>
        </div>

          <div v-if="authStore.registerErrors">
            <h3>Ошибки регистрации</h3>
            <div>
              {{authStore.registerErrors}}
            </div>
            <hr>
            <br><br><br>
          </div>
        </div>

        <!--
        <h3>DEBUG</h3>
        <b>isLoaded</b>: {{authStore.isLoaded}}<br />
        <b>isLoading</b>: {{authStore.isLoading}}<br />
        <b>isConnected</b>: {{authStore.isConnected}}<br />
        <b>isRegistered</b>: {{authStore.isRegistered}}<br />
        <b>isVerified</b>: {{authStore.isVerified}}<br />
        <b>ConnectionAddress</b>: {{authStore.address}}<br />
        <b>isLoggedIn</b>: {{authStore.isLoggedIn}}<br />
        <b>metapass</b>: {{authStore.metapass}}<br />
        <b>token</b>: {{authStore.token}}<br />
        -->
      </div>
      <div v-else>
        <q-spinner
          color="primary"
          size="5em"
        />
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
      types: [
        {
          label: 'Player',
          value: 1
        },
        {
          label: 'Game',
          value: 2
        }
      ],
      showMorePlayer: false,
      showMoreGame: false,
      type: 1,
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

    async onRegister (formRef) {
      // const form = document.getElementById(formRef)
      const form = this.$refs[formRef]
      const formData = new FormData(form.$el)
      formData.append('address', this.authStore.address)
      formData.append('type', this.type)
      await this.authStore.registerMetapass(formData)
    }
  }
})
</script>
