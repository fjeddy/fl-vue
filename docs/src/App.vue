<template>
  <div class="d-flex flex-column h-100">

    <fl-navbar :menu="navigation">
      <fl-link class="navbar-brand" to="/">
        fl-vue
      </fl-link>
    </fl-navbar>

    <fl-content class="flex-fill" />

    <fl-footer>
      <div class="container">
        This is a footer
      </div>
    </fl-footer>

  </div>
</template>

<script>
import {
  FlNavbar,
  FlContent,
  FlFooter
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
              title: 'Documentation',
              to: '/',
              className: 'test'
            },
            {
              title: 'Example layouts',
              dropdown: [
                {
                  title: 'With a header',
                  to: '/examples/header'
                },
                {
                  title: 'With a sidebar',
                  to: '/examples/sidebar'
                },
                {
                  title: 'With a header and sidebar',
                  to: '/examples/header-sidebar'
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
    FlContent,
    FlFooter
  }
}
</script>

<style lang="scss">
@import "~fl-vue/src/scss/variables.scss";
@import "~fl-vue/src/scss/fj-vue.scss";

a {
  text-decoration: none;
}
</style>
