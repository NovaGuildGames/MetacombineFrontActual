<template>
  <div>
    <q-dialog v-model="app.errors.discord_nickname_empty" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Внимание!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>
            В вашем профиле не указан никнейм дискорд, для продолжения пожалуйста укажите его ниже:
          </p>
          <div class="q-pt-lg">
            <q-form class="q-gutter-md" ref="ErrorForm">
              <q-input filled placeholder="Discord#0000" v-model="app.errorsData.discord_nickname_empty.discord_nickname" :rules="[ $rules.discord_nickname ]" autofocus @keyup.enter="prompt = false" />
            </q-form>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Применить" @click="submitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'

export default defineComponent({
  setup () {
    const app = useAppStore()

    return {
      app
    }
  },
  methods: {
    async submitForm () {
      const validated = await this.$refs.ErrorForm.validate()
      if (validated) {
        await this.app.updateMetapass(this.app.errorsData.discord_nickname_empty)
        await this.app.removeErrors('discord_nickname_empty')
      }
    }
  }
})
</script>
