<template>
  <div>
    <ErrorDiscordNicknameEmpty />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

// Импорт компонентов всех ошибок
import ErrorDiscordNicknameEmpty from 'components/errors/ErrorDiscordNicknameEmpty'

export default defineComponent({
  components: {
    ErrorDiscordNicknameEmpty
  }
})
</script>
