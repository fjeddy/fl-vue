export default {
  name: 'FlContent',

  data: function() {
    return {

    }
  },

  render: function(h) {
    let row = h(
      'div',
      {
        class: 'row h-100'
      },
      [
        this.createSidebar(h),
        this.createContent(h)
      ]
    )

    let container = h(
      'div',
      { class: 'container flex-fill' },
      [
        row
      ]
    )

    return h(
      'div',
      { class: 'fl-content-wrapper d-flex flex-column' },
      [
        this.createHeader(h),
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

      if (this.$fj.options.header.class) {
        const c = this.$fj.options.header.class.split(' ')
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

      if (this.$fj.options.sidebar.class) {
        const c = this.$fj.options.sidebar.class.split(' ')
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

      if (this.$fj.options.content.class) {
        const c = this.$fj.options.content.class.split(' ')
        for (const cc of c) {
          classes[cc] = true
        }
      }

      return classes
    }
  },

  methods: {
    createHeader(h) {
      if (!this.hasHeader) return
      return h(
        'div',
        {
          class: this.getHeaderClasses
        },
        [ h('router-view', { props: { name: 'header' } } ) ]
      )
    },

    createSidebar(h) {
      if (!this.hasSidebar) return
      return h(
        'div',
        {
          class: this.getSidebarClasses
        },
        [ h('router-view', { props: { name: 'sidebar' } } ) ]
      )
    },

    createContent(h) {
      return h(
        'div',
        {
          class: this.getContentClasses
        },
        [ h('router-view') ]
      )
    }
  }
}
