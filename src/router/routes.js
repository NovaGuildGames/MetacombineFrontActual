const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'index'
      },
      {
        path: '/register',
        component: () => import('pages/RegisterPage.vue'),
        name: 'register'
      },
      {
        path: '/metapass',
        component: () => import('pages/ProfilePage.vue'),
        name: 'profile'
      },
      /*
      {
        path: '/billboard/:game',
        component: () => import('pages/IndexPage.vue'),
        props: true,
        name: 'billboard-by-game'
      }
      */
      {
        path: '/billboard',
        component: () => import('pages/IndexPage.vue'),
        props: true,
        name: 'billboard'
      }
    ]
  },

  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
