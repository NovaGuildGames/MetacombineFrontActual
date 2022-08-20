<template>
  <q-page class="q-pt-lg overflow-hidden">
    <div class="container">
      <div v-if="authStore.isLoading">
        <q-spinner
          color="primary"
          size="5em"
        />
      </div>
      <div v-else>
        <div v-if="authStore.metapass">
          <div class="profile">
            <div class="profile__logo">
              <q-form
                class="profile-logo-wrapper"
                id="updatePlayerLogo"
                enctype="multipart/form-data"
                ref="updatePlayerLogo"
              >
                <q-img
                  class="profile__avatar"
                  :src="authStore.metapass.logo"
                  v-if="authStore.metapass.logo"
                />

                <q-img
                  class="profile__avatar"
                  src="~assets/no-avatar.svg"
                  v-else
                />

                <q-file :display-value="false" class="logo-profile-upload" name="logo" v-model="updateLogo" accept=".jpg, .png"></q-file>
              </q-form>
            </div>
            <div class="profile__menu">
              <div class="row items-center row1" v-if="authStore.metapass.name">
                <div class="col-auto">
                  <span class="profile__nickname">
                    {{authStore.metapass.name}}
                  </span>
                </div>
                <div class="col-auto">
                  <q-btn flat color="primary" @click="authStore.logout">Log out</q-btn>
                </div>
              </div>
              <div class="profile__discord row" v-if="authStore.metapass.discord_nickname">
                <div class="profile__discord-icons">
                  <img src="../../public/icons/discord.svg" alt="discord-icons">
                </div>
                <p class="profile__discord-nickname">
                  {{authStore.metapass.discord_nickname}}
                </p>
              </div>
              <div class="profile__language row" v-if="authStore.metapass.languages && authStore.metapass.languages.length > 0">
                <div>{{authStore.metapass.languages.join(', ')}}</div>
              </div>
              <div class="profile__about" v-if="authStore.metapass.description">
                {{authStore.metapass.description}}
              </div>

              <div class="updateBtn-wrapper">
                <q-btn class="q-mt-md text-black" color="grey-4" rounded unelevated @click="$router.push({name: 'update-profile'})" v-if="authStore.metapass.type == 1">
                  <q-icon name="fa-solid fa-pencil" class="q-mr-xs" /> Update profile
                </q-btn>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <template v-if="!billboardStore.advertsFirstPage">
                <div class="row items-center">
                  <div class="col">
                    <h3 class="text-h3">
                      My Billboard
                    </h3>
                  </div>
                  <div class="col-auto" v-if="authStore.isLoggedIn">
                    <q-btn color="primary" @click="onClickNewBillboard">
                      <q-icon name="fa-solid fa-plus" class="q-mr-xs" /> New
                    </q-btn>
                  </div>
                </div>

                <FilterTagsProfile />
              </template>

              <div class="q-mt-lg">
                <div v-if="!billboardStore.advertsLoading">
                  <div v-if="billboardStore.adverts.length > 0">
                    <div class="card-md" v-for="item in billboardStore.adverts" :key="item">
                      <BillboardTpl :item="item" :isLoading="billboardStore.advertsLoading" :showButtons="authStore.isLoggedIn" :showDelete="true" />
                    </div>
                  </div>
                  <div v-else>
                    <h4>No results</h4>
                  </div>
                </div>
                <div v-else>
                  <q-spinner
                    color="primary"
                    size="5em"
                  />
                </div>
              </div>

              <Pagination :links="billboardStore.advertsPagination" :isLoading="billboardStore.advertsLoading" @onPaginate="onPaginate" />
            </div>
          </div>

          <PublishModal />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStore } from 'stores/app'
import { useAuthStore } from 'stores/app/auth'
import { useBillboardStore } from 'stores/billboard'
import PublishModal from 'components/billboard/PublishModal'
import BillboardTpl from 'components/billboard/BillboardTpl'
import FilterTagsProfile from 'components/billboard/FilterTagsProfile'
import Pagination from 'components/common/Pagination'

export default defineComponent({
  name: 'ProfilePage',
  components: {
    BillboardTpl,
    Pagination,
    FilterTagsProfile,
    PublishModal
  },
  setup () {
    const appStore = useAppStore()
    const authStore = useAuthStore()
    const billboardStore = useBillboardStore()

    return {
      appStore,
      authStore,
      billboardStore
    }
  },
  data () {
    return {
      updateLogo: null
    }
  },
  methods: {
    onPaginate (url) {
      this.billboardStore.loadAdverts(url)
    },

    onClickNewBillboard () {
      this.billboardStore.openModal()
    },

    async initProfile () {
      await this.billboardStore.setCurrentUser(this.authStore.metapass.address)
      await this.billboardStore.loadAdverts()
    }
  },
  async mounted () {
    if (this.authStore.isLoggedIn) {
      await this.initProfile()
    } else {
      this.$router.push({ name: 'register' })
    }
  },
  watch: {
    'authStore.isLoggedIn': {
      deep: true,
      async handler (val) {
        if (val) {
          await this.initProfile()
        }
      }
    },

    updateLogo: {
      deep: true,
      async handler (val) {
        const form = this.$refs.updatePlayerLogo
        const formData = new FormData(form.$el)
        await this.authStore.updateLogo(formData)
      }
    }
  }
})
</script>
