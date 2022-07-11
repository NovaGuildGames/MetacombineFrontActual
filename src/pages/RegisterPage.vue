<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <div class="text-h3">
          Register
        </div>
        <div>
          <q-btn color="primary" label="Connect" @click="authStore.connect" />
        </div>
      </div>

      <div>
        <b>isLoaded</b>: {{authStore.isLoaded}}<br />
        <b>isConnected</b>: {{authStore.isConnected}}<br />
        <b>isRegistered</b>: {{authStore.isRegistered}}<br />
        <b>isVerified</b>: {{authStore.isVerified}}<br />
        <b>ConnectionAddress</b>: {{authStore.address}}<br />
        <b>isLoggedIn</b>: {{authStore.isLoggedIn}}<br />
        <b>metapass</b>: {{authStore.metapass}}<br />
        <b>token</b>: {{authStore.token}}<br />
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

    }
  },
  methods: {

  }
})
</script>
