import Vue from 'vue'
import FlVue from 'fl-vue'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = true

Vue.use(FlVue, {
  options: {
    navbar: {
      class: 'navbar-light bg-light'
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
