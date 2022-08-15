<template>
  <q-layout view="hHh lpR fff">
    <q-ajax-bar :hijack-filter="myFilterFn" color="primary" />

    <q-header class="bg-white text-black">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="row items-center cursor-pointer" @click="$router.push({ name: 'index' })">
          <q-avatar rounded size="1.75rem">
            <img :src="require('src/assets/logo2.png')">
          </q-avatar>
          <div class="q-ml-sm">
            <b>MetaCombine</b>
          </div>
        </q-toolbar-title>

        <q-btn flat v-show="false">
          Игры
        </q-btn>

        <div>
          <div v-if="!authStore.isLoaded">
            <q-spinner
              color="primary"
              size="2em"
            />
          </div>
          <div v-else>
            <q-btn color="primary" v-if="!authStore.metapass && ($route.name != 'register')" @click="authStore.connect">
              Connect
            </q-btn>
          </div>
        </div>

        <q-btn class="header__avatar" flat no-wrap v-if="authStore.isLoaded && authStore.isLoggedIn" @click="$router.push({name: 'profile'})">
            <q-avatar size="2rem">
              <q-img
                :src="authStore.metapass.logo"
                v-if="authStore.metapass.logo"
                :ratio="1/1"
              />

              <q-img
                src="~assets/no-avatar.svg"
                v-else
              />
            </q-avatar>
            <div class="arrow">
              <q-icon name="eva-chevron-down-outline" size="1.3rem" />
            </div>
            <!--q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section class="cursor-pointer" @click="gotoProfile">
                    Metapass
                  </q-item-section>
                </q-item>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section class="cursor-pointer" @click="authStore.logout">
                    Logout
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu-->
          </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="desktop" :width="600" bordered v-show="false">
      <!-- drawer content -->
    </q-drawer>

    <q-footer class="bg-white text-black">
      <div class="container q-mb-lg q-pb-sm">
        <div class="footer__wrap">
          <div class="footer__links" color="secondary">
            <q-btn flat size="md" class="q-mr-md">
              Cookies policy
            </q-btn>

            <q-btn flat size="md" class="q-mr-md">
              Privacy policy
            </q-btn>

            <q-btn flat size="md" class="q-mr-md">
              Linkedin
            </q-btn>

            <q-btn flat size="md" class="q-mr-md">
              Youtube
            </q-btn>
          </div>
        </div>
      </div>
    </q-footer>

    <ErrorsHandle />
  </q-layout>
</template>

<script>
import { useAppStore } from 'stores/app'
import { useAuthStore } from 'stores/app/auth'
import ErrorsHandle from 'components/errors/ErrorsHandle'

export default {
  components: {
    ErrorsHandle
  },
  setup () {
    const app = useAppStore()
    const authStore = useAuthStore()
    const rightDrawerOpen = true

    return {
      app,
      authStore,
      rightDrawerOpen
    }
  },
  methods: {
    async gotoProfile () {
      await this.$router.push({ name: 'profile' })
    },
    myFilterFn (url) {
      const check = /^https:\/\/mc.yandex/ui.test(url)
      return !check
    }
  },
  watch: {
    'appStore.errors': {
      deep: true,
      handler (val) {

      }
    }
  }
}
</script>
