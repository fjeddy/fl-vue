module.exports = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: () => import(/* webpackChunkName: "page-index" */ '@/views/pages/Index.vue'),
      sidebar: () => import(/* webpackChunkName: "sidebar-navigation" */ '@/views/sidebars/Navigation.vue')
    },
    meta: {
      title: "Welcome"
    }
  },

  {
    path: '/getting-started',
    name: 'GettingStarted',
    components: {
      default: () => import(/* webpackChunkName: "page-gettingStarted" */ '@/views/pages/GettingStarted.vue'),
      sidebar: () => import(/* webpackChunkName: "sidebar-navigation" */ '@/views/sidebars/Navigation.vue')
    },
    meta: {
      title: "Getting started"
    }
  }
]
