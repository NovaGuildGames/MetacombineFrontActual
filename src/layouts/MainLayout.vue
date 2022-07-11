<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-white text-black">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="row items-center">
          <q-avatar rounded size="1.75rem">
            <img :src="require('src/assets/logo2.png')">
          </q-avatar>
          <div class="q-ml-sm">
            <b>MetaCombine</b>
          </div>
        </q-toolbar-title>

        <q-btn flat>
          Игры
        </q-btn>

        <q-btn color="primary" v-if="authStore.isLoaded && !authStore.metapass" @click="authStore.connect">
          Connect
        </q-btn>

        <q-btn flat no-wrap v-if="authStore.isLoaded && authStore.isLoggedIn">
            <q-avatar size="2rem">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg">
            </q-avatar>
            <q-icon name="eva-chevron-down-outline" size="1.3rem" />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section class="cursor-pointer" @click="authStore.logout">
                    Logout
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="desktop" :width="600" bordered v-show="false">
      <!-- drawer content -->
    </q-drawer>

    <br><br><br>

    <q-footer class="bg-white text-black">
      <div class="container q-mb-lg q-pb-sm">
        <div class="row">
          <div class="col" color="secondary">
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

  </q-layout>
</template>

<script>
import { useAppStore } from 'stores/app'
import { useAuthStore } from 'stores/app/auth'

export default {
  setup () {
    const app = useAppStore()
    const authStore = useAuthStore()
    const rightDrawerOpen = true

    return {
      app,
      authStore,
      rightDrawerOpen
    }
  }
}
</script>
