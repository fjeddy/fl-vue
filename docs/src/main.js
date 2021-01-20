import Vue from 'vue'
import FlVue from 'fl-vue'
import { FlLink } from 'fl-vue'

import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = true

Vue.use(FlVue, {
  options: {
    navbar: {
      class: 'navbar-light bg-light py-5'
    },
    header: {
      class: 'py-5'
    },
    sidebar: {
      class: 'py-5'
    },
    content: {
      class: 'py-5'
    },
    footer: {
      class: 'bg-light py-5'
    }
  }
})

Vue.component('fl-link', FlLink)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
