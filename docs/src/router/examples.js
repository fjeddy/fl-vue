module.exports = [
  {
    path: '/examples/header',
    name: 'ExamplesHeader',
    components: {
      default: () => import(/* webpackChunkName: "page-examples-header" */ '@/views/pages/examples/Header.vue'),
      header: () => import(/* webpackChunkName: "header-example" */ '@/views/headers/Example.vue')
    },
    meta: {
      title: "Example with header",
      header: {
        class: 'py-5'
      },
      content: {
        class: 'py-5'
      },
      sidebar: {
        class: 'py-5'
      }
    }
  },

  {
    path: '/examples/sidebar',
    name: 'ExamplesSidebar',
    components: {
      default: () => import(/* webpackChunkName: "page-examples-sidebar" */ '@/views/pages/examples/Sidebar.vue'),
      sidebar: () => import(/* webpackChunkName: "sidebar-example" */ '@/views/sidebars/Example.vue')
    },
    meta: {
      title: "Example with sidebar"
    }
  },

  {
    path: '/examples/header-sidebar',
    name: 'ExamplesHeaderSidebar',
    components: {
      default: () => import(/* webpackChunkName: "page-examples-sidebar" */ '@/views/pages/examples/Sidebar.vue'),
      sidebar: () => import(/* webpackChunkName: "sidebar-example" */ '@/views/sidebars/Example.vue'),
      header: () => import(/* webpackChunkName: "header-example" */ '@/views/headers/Example.vue')
    },
    meta: {
      title: "Example with header and sidebar"
    }
  }
]
