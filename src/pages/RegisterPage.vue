<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <div class="text-h3">
          Register
        </div>
      </div>

      <div v-if="!authStore.isLoading">
        <div v-if="!authStore.address && !authStore.metapass">
          <p>
            Вы еще не подключились к метапасс, для регистрации подключитесь (кнопка наверху)
          </p>
        </div>
        <div v-if="authStore.metapass">
          <p>
            Вы уже зарегистрированы в системе
          </p>
        </div>
        <div v-if="authStore.address && !authStore.metapass">
          <p>
            Вы еще не зарегистрированы, пожалуйста зарегистрируйтесь в системе, для того чтобы пользоваться всеми возможностями платформы
          </p>

          <div v-if="!type">
            <div class="text-subtitle2 text-center q-mt-md">Для продолжения регистрации выберите тип учетной записи</div>
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
          </div>

          <!-- Игрок -->
          <div v-if="type == 1" class="row full-width justify-center">
            <div class="col-12 col-lg-12 row items-center justify-center q-my-sm">
              <q-btn class="q-mr-sm" icon="person" stack size="lg" flat />
              <div class="self-center">Регистрация игрока</div>
            </div>
            <div class="col-12 col-lg-6">
              <q-form
                id="registerPlayerForm"
                enctype="multipart/form-data"
                class="q-gutter-md"
              >

                <q-input v-model="register.player.nickname" label="Nickname*" name="nickname" filled />
                <q-input v-model="register.player.discord_nickname" label="Discord Nickname*" name="discord_nickname" filled/>
                <q-file name="logo" v-model="register.player.logo" accept=".jpg, .png" filled label="Avatar">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <p>Description/Bio*</p>
                <q-editor v-model="register.player.description" min-height="6rem" />
                <input type="hidden" v-model="register.player.description" name="description" />

                <q-select clearable v-model="register.player.location_id" label="Location" name="location_id" :options="appStore.lists.locations" @filter="(val, update) => filterUpdate(val, update, 'locations')" use-input filled/>
                <q-select clearable v-model="register.player.devices" label="Devices" name="devices[]" :options="appStore.lists.devices" @filter="(val, update) => filterUpdate(val, update, 'devices')" use-input multiple use-chips stack-label map-options filled/>
                <q-select clearable v-model="register.player.skills" label="Skills" name="skills[]" :options="appStore.lists.skills" @filter="(val, update) => filterUpdate(val, update, 'skills')" multiple use-input use-chips stack-label map-options filled/>
                <q-select clearable v-model="register.player.games" label="Games" name="games[]" :options="appStore.lists.games" @filter="(val, update) => filterUpdate(val, update, 'games')" multiple use-input use-chips stack-label map-options filled/>
                <q-select clearable v-model="register.player.statuses" label="Statuses" name="statuses[]" :options="appStore.lists['player-statuses']" @filter="(val, update) => filterUpdate(val, update, 'player-statuses')" multiple use-input use-chips stack-label map-options filled/>

                <q-btn color="primary" label="Register" @click="onRegister('registerPlayerForm')" />
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
      type: null,
      register: {
        player: {
          description: null
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
      const form = document.getElementById(formRef)
      const formData = new FormData(form)
      formData.append('address', this.authStore.address)
      formData.append('type', this.type)
      await this.authStore.registerMetapass(formData)
    }
  }
})
</script>
