<template>
  <div class="d-flex flex-column h-100">

    <fl-navbar class="navbar-light bg-light" :menu="navigation">
      <fl-link class="navbar-brand" to="/">
        fl-vue
      </fl-link>
    </fl-navbar>

    <fl-header class="py-5 bg-danger">
      <div class="container">
        This is a header
      </div>
    </fl-header>

    <fl-content class="flex-fill py-5 bg-success">
      <div class="container">
        This is the content
      </div>
    </fl-content>

    <fl-footer class="py-5 bg-warning">
      <div class="container">
        This is a footer
      </div>
    </fl-footer>

  </div>
</template>

<script>
import {
  FlNavbar,
  FlHeader,
  FlContent,
  FlFooter,
  FlLink
} from 'fl-vue'

export default {
  data: function() {
    return {
      navigation: [
        {
          className: 'me-auto',
          visible: true,
          items: [
            {
              title: 'Home',
              to: '/',
              className: 'test'
            },
            {
              title: 'Examples',
              dropdown: [
                {
                  title: 'Header',
                  to: '/examples/header'
                }
              ]
            }
          ]
        },
        {
          visible: true,
          items: [
            {
              title: 'Test',
              to: '/test'
            },
            {
              title: 'Hmmm',
              to: '/hmmmmm'
            }
          ]
        },
        [
          {
            title: 'Register',
            to: '/register'
          },
          {
            title: 'Login',
            to: '/login'
          }
        ]
      ]
    }
  },

  components: {
    FlNavbar,
    FlHeader,
    FlContent,
    FlFooter,
    FlLink
  }
}
</script>

<style lang="scss">
@import "~fl-vue/src/scss/variables.scss";
@import "~fl-vue/src/scss/fj-vue.scss";
</style>
