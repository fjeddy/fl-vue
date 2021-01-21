import FlLink from '../FlLink'
import FlDropdown from '../FlDropdown'

export default {
  name: 'FlNavbar',

  props: {
    menu: {}
  },

  components: {
    FlLink,
    FlDropdown
  },

  render: function(h) {
    return this.ce(
      h,
      'nav',
      this.getClasses,
      [ this.createContainer(h) ]
    )
  },

  computed: {
    getClasses() {
      const classes = {
        'fl-footer': true,
        'fl-navbar': true,
        'navbar': true,
        'navbar-expand-lg': true
      }

      if (this.$fj.options.navbar.class) {
        const c = this.$fj.options.navbar.class.split(' ')
        for (const cc of c) {
          classes[cc] = true
        }
      }

      return classes
    }
  },

  methods: {
    ce(c, string, classNames, array) {
      return c(
        string,
        {
          class: classNames
        },
        array
      )
    },

    createContainer(h) {
      const elements = []

      if (this.menu) {
        let menu = []

        if (!Array.isArray(this.menu)) menu.push(this.menu)
        else menu = this.menu

        for (const nav of menu) {
          let element
          if (Array.isArray(nav)) element = this.createNavbarNav(h, { items: nav })
          else element = this.createNavbarNav(h, nav)
          if (element) elements.push(element)
        }
      }

      return this.ce(
        h,
        'div',
        'container',
        [
          this.$slots.default,
          ...elements
        ]
      )
    },

    createNavbarNav(h, nav) {
      if (nav.visible === false) return

      const elements = []

      if (nav.items) {
        for (const item of nav.items) {

          if (item.dropdown) {
            if (!Array.isArray(item.dropdown)) throw new Error('Dropdown list is not an array.')
            const element = this.createNavDropdown(h, item)
            if (element) elements.push(element)
          } else {
            const element = this.createNavItem(h, item)
            if (element) elements.push(element)
          }

        }
      }

      return h(
        'ul',
        {
          class: {
            'navbar-nav': true,
            [nav.className]: (nav.className) ? true : false
          }
        },
        elements
      )
    },

    createNavItem(h, item) {
      if (item.visible === false) return

      return this.ce(
        h,
        'li',
        'nav-item',
        [ this.createNavLink(h, item) ]
      )
    },

    createNavLink(h, item) {
      return h(
        'fl-link',
        {
          class: 'nav-link',
          props: {
            to: item.to
          }
        },
        [ item.title ]
      )
    },

    createNavDropdown(h, item) {
      if (item.visible === false) return

      return h(
        'fl-dropdown',
        {
          props: {
            items: item.dropdown,
            title: item.title,
            className: 'nav-item',
            handlerClassName: 'nav-link dropdown-toggle',
            container: 'li'
          }
        }
      )
    }
  }
}
