<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div v-if="authStore.metapass">
        <div class="profile">
          <div class="profile__logo">
            <img src="../../public/icons/profile.png" alt="avatar">
          </div>
          <div class="profile__menu">
            <p class="profile__nickname">Maksonic</p>
            <div class="profile__discord row">
              <div class="profile__discord-icons"><img src="../../public/icons/discord.svg" alt="discord-icons"></div>
              <p class="profile__discord-nickname">Ekimka#5658</p>
            </div>
            <div class="profile__language row">
              <span>Языки:</span>
              <p>Английский, русский</p>
            </div>
            <p class="profile__about">
            Download Discord 12 SVG vector file in monocolor and multicolor type for Sketch or Illustrator from Discord 12 Vectors svg vector collection. Discord 12 Vectors SVG vector illustration graphic
            </p>
          </div>
        </div>
        <!-- /.profile -->

        <!-- <pre>
          {{authStore.metapass}}
        </pre> -->
      </div>
      <div v-else>
        <h3 style="color: red">
          Вы не авторизированы
        </h3>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'
import { useAuthStore } from 'stores/app/auth'

export default defineComponent({
  name: 'ProfilePage',
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

    }
  },
  methods: {

  }
})
</script>
