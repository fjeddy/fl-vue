import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import core from '@/router/core'
import examples from '@/router/examples'

const routes = [
  ...core,
  ...examples,

  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "page-404" */ '@/views/pages/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title + ' - Framework'
  else document.title = to.name + ' - Framework'
  next()
})

export default router
