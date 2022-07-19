<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div v-if="authStore.metapass">
        <div class="profile row">
          <div class="profile__logo">
            <img src="../../public/icons/avatar.png" alt="avatar">
          </div>
          <div class="profile__menu">
            <p class="profile__nickname">Maksonic</p>
            <p class="profile__language">Английский, русский</p>

            <div class="profile__achievements">
              <span>NFT</span>
              <div class="profile__achievements-wrap row">
                <div class="profile__achievements-item">
                  <img src="../../public/icons/Frame1.svg" alt="ачивка">
                </div>
                <div class="profile__achievements-item">
                  <img src="../../public/icons/Frame2.svg" alt="ачивка">
                </div>
                <div class="profile__achievements-item">
                  <img src="../../public/icons/Frame3.svg" alt="ачивка">
                </div>
              </div>
            </div>
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
