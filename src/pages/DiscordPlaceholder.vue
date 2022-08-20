<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div class="q-pt-md q-pb-sm row justify-between">
        <q-spinner
          v-if="isLoading"
          color="primary"
          size="5em"
        />
        <div v-else>
          <p>
            Discord link already followed. You can close this page
          </p>
          <q-btn color="primary" @click="closeWindow">
            <q-icon name="fa-solid fa-close" class="q-mr-xs" /> Close window
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DiscordPlaceholderPage',
  data () {
    return {
      isLoading: true
    }
  },
  async mounted () {
    const self = this
    setTimeout(function () {
      self.isLoading = false
    }, 2000)
  },
  methods: {
    closeWindow () {
      window.close()
    }
  }
})
</script>
