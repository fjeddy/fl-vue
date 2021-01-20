import FlHeader from '../FlHeader'

export default {
  name: 'FlContent',

  data: function() {
    return {

    }
  },

  render: function(createElement) {
    let row = createElement(
      'div',
      {
        class: 'row h-100'
      },
      [
        this.createSidebar(createElement),
        this.createContent(createElement)
      ]
    )

    let container = createElement(
      'div',
      { class: 'container flex-fill' },
      [
        row
      ]
    )

    return createElement(
      'div',
      { class: 'fl-content-wrapper d-flex flex-column' },
      [
        this.createHeader(createElement),
        container
      ]
    )
  },

  mounted() {

  },

  computed: {
    hasSidebar() {
      if (this.$route.matched[0] && this.$route.matched[0].components.sidebar) {
        return true
      }

      return false
    },

    hasHeader() {
      if (this.$route.matched[0] && this.$route.matched[0].components.header) {
        return true
      }

      return false
    },

    getHeaderClasses() {
      const classes = {
        'fl-header': true
      }

      if (this.$route.meta && this.$route.meta.header && this.$route.meta.header.class) {
        const c = this.$route.meta.header.class.split(' ')
        for (const cc of c) {
          classes[cc] = true
        }
      }

      return classes
    },

    getSidebarClasses() {
      const classes = {
        'fl-sidebar': true,
        'col-md-3': true
      }

      if (this.$route.meta && this.$route.meta.sidebar && this.$route.meta.sidebar.class) {
        const c = this.$route.meta.sidebar.class.split(' ')
        for (const cc of c) {
          classes[cc] = true
        }
      }

      return classes
    },

    getContentClasses() {
      const classes = {
        'fl-content': true,
        'col': true,
        'h-100': true
      }

      if (this.$route.meta && this.$route.meta.content && this.$route.meta.content.class) {
        const c = this.$route.meta.content.class.split(' ')
        for (const cc of c) {
          classes[cc] = true
        }
      }

      return classes
    }
  },

  methods: {
    createHeader(createElement) {
      return createElement(
        'div',
        {
          class: this.getHeaderClasses
        },
        [ createElement('router-view', { props: { name: 'header' } } ) ]
      )
    },

    createSidebar(createElement) {
      if (!this.hasSidebar) return
      
      return createElement(
        'div',
        {
          class: this.getSidebarClasses
        },
        [ createElement('router-view', { props: { name: 'sidebar' } } ) ]
      )
    },

    createContent(createElement) {
      return createElement(
        'div',
        {
          class: this.getContentClasses
        },
        [ createElement('router-view') ]
      )
    }
  }
}
