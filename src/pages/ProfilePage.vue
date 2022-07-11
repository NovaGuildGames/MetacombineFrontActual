<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <div class="text-h3">
          My Metapass
        </div>
      </div>

      <div v-if="authStore.metapass">
        <h3>
          Тут будет информация об пользователе
        </h3>
        <pre>
          {{authStore.metapass}}
        </pre>
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
