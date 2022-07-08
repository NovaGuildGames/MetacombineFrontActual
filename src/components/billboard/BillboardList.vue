<template>
  <div>
    <div class="row items-center">
      <div class="col">
        <h3 class="text-h3">
          Go Play
        </h3>
      </div>
      <div>
        <q-btn color="primary" @click="$emit('onClickNew')">
          <q-icon name="fa-solid fa-plus" class="q-mr-xs" /> New
        </q-btn>
      </div>
    </div>

    <FilterTags class="card-md" :items="['Игра', 'Online', 'Big party', 'Last player', 'Фильтр']" @click="onFilterSelect" />

    <div class="q-mt-lg">
      <div class="card-md" v-for="item in list" :key="item">
        <BillboardTpl :item="item" />
      </div>
    </div>

    <Pagination :links="links" />
  </div>
</template>

<style scoped lang="scss">
  .card-md {
    margin-bottom: 2.5rem;
  }
</style>

<script>
import BillboardTpl from './BillboardTpl'
import Pagination from 'src/components/common/Pagination'
import FilterTags from './FilterTags'
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['items', 'isLoading'],
  emits: ['onClickNew'],
  components: {
    BillboardTpl,
    FilterTags,
    Pagination
  },
  setup () {
    const list = [
      {
        name: 'Ev.io',
        text: 'Набор 5 человек в шутер ev.io, опыт в кс и подобные шутеры 3 года+',
        devices: ['PC'],
        user: 'Andrexxw',
        avatar: 'https://s3-alpha-sig.figma.com/img/5b54/413f/3046042f28c491365f068283a5a669d1?Expires=1657497600&Signature=gWXX6bTAnF~k-GEQNDBof0Yy-n97kog1j6f8Aae5PQKMvGmLyETTBpk84gTpnWne0m28dujUst50M6QI77YBNu7GkUjdbtlaQWQpbh0nJNDnfmw6FUSSsaDwjuNBoamUCvYkz72Xm5B862-Cn9pDC1v9vx4xJ-~FnbncaClr0DVsG9P3K2zLGIl7WNwRn7-5qEryN9cLsvLE-uT1kr1XQwYbgUL4SmfwosJYS9ignm82bge-zdRKwPVEJDs31Q0GeDv2XjbzAQwPGZ5aD4ULnYoWiltcsHVmVqjPMzAi49gfutXfMLpuaWLHSVOS-F9D4dt4ZbugLIsyyYzoHquGDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        spot_all: 5,
        spot_current: 3
      },
      {
        name: 'Axie Infinity',
        text: '10 человек на турнир в Акси, MMR 1800+, NFT свои/арендные',
        devices: ['Android', 'IOS', 'PC'],
        user: 'NovaGild',
        verified: true,
        avatar: 'https://s3-alpha-sig.figma.com/img/671e/2b06/08c3c2e68a4c95a2ec903c13924a5926?Expires=1657497600&Signature=FTaWwOtq7HjbWNIhTUQ~3vLk-ULWg7jmaNtDYU-OC1SiE2lTc1FW7waNVDadNLlRT~Z7VDfRxcLjEkxnNnSk0Y2WudOSUXUg2KW-9EG4DZ4eQbJWVTlUpn43YRnyXQGdIWm5DI2IWJWiHCucRsz~pl9NYpYKdOkma5E1n52AtJ3G0UVaPd1TUMH8DEqr4VV1G8o360G5xJVJcFDFtFMkeLVEAq-9HKjtZ9hKF5-Cbv5pT5DgZxiklK1HZiajjotp~NbZ6r35ZBNe~2fMZc9Vx3Ho85V-~qtQU0BYTTo5ucq408BnVumt-9guvpIlX-ggKST8qGYp4qmu0R7-NdZn4g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        spot_all: 10,
        spot_current: 0
      },
      {
        name: 'X-metaverse',
        text: 'Тренер: с меня стратегии, NFT аренду, с вам 30% прибыли',
        devices: ['PC'],
        user: 'Andrexxw',
        guild: 'NovaGuild',
        avatar: 'https://s3-alpha-sig.figma.com/img/267a/9588/f3b2c8044ca586a7e1cb7328f304edbf?Expires=1657497600&Signature=B-ddEwUiN3O6L0HHxrAXy8dyAiZjX2gSLCBCoOoUmHdpxyJiwHVscsNZd-1isZaTjkOfUXSxN1FC093KU6-KlShrIaqYeG7dnWbiKtJVyREbgC8nq0gX4z-M6R1LRL3idzD~cEKadfzfMOHbmG5eDocrD15G7YY2HtedyuD4xhu50L1h8jLQH32JE4-muuPcUQzXW7PArAoqFWCan6WXedu2DVJNsIZkYqQHPGzi8DOzuILz6sRdVjMJ7-d4RM~~n0RaUXNXdgj8uJWd06ck1TweRDgvEak1qacDq82zJRhpL8nUtmHtoPxmnfkvjNEefjphG1Vz5L7UyHbSq-c4rw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        spot_all: 10,
        spot_current: 9
      }
    ]

    const links = [
      {
        url: null,
        label: 'pagination.previous',
        active: false
      },
      {
        url: 'http://localhost/api/billboard/choose/games?page=1',
        label: '1',
        active: true
      },
      {
        url: 'http://localhost/api/billboard/choose/games?page=2',
        label: '2',
        active: false
      },
      {
        url: 'http://localhost/api/billboard/choose/games?page=3',
        label: '3',
        active: false
      },
      {
        url: 'http://localhost/api/billboard/choose/games?page=4',
        label: '4',
        active: false
      },
      {
        url: 'http://localhost/api/billboard/choose/games?page=5',
        label: '5',
        active: false
      },
      {
        url: 'http://localhost/api/billboard/choose/games?page=2',
        label: 'pagination.next',
        active: false
      }
    ]

    return {
      list,
      links
    }
  },
  methods: {
    onFilterSelect (item) {
      console.log(item)
    }
  }
})
</script>
