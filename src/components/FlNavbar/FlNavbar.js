import FlLink from '../FlLink'

export default {
  name: 'FlNavbar',

  props: {
    menu: {
      type: Array
    }
  },

  components: {
    FlLink
  },

  render: function(createElement) {
    return createElement(
      'nav',
      {
        class: {
          'fl-navbar': true,
          'navbar': true,
          'navbar-expand-lg': true
        }
      },
      [
        this.navContainer(createElement)
      ]
    )
  },

  methods: {
    navContainer(createElement) {
      return createElement(
        'div',
        {
          class: {
            'container': true
          }
        },
        [
          this.$slots.default,
          this.createMenus(createElement)
        ]
      )
    },

    createMenus(createElement) {
      const result = []

      if (this.menu) {
        for (const link of this.menu) {
          if (typeof link != 'object') throw new Error('Menu option is not an object or an array')

          let linkss = []

          if (Array.isArray(link)) {
            linkss = link
          } else {
            linkss = link.links
            var { links, ...options } = link
          }
          
          if (options.visible && options.visible === false) continue
          if (!link.links) result.push(this.createDropdown(createElement, link))
        }
      }

      return result
    },

    createDropdown(createElement, link) {
    }

    /**
    createNavigation(createElement) {
      return createElement(
        'div',
        {
          class: {
            'container': true
          }
        },
        [
          this.$slots.default,
          ...this.createMenu(createElement)
        ]
      )
    },

    createMenu(createElement) {
      const result = []

      if (this.menu) {
        for (const group of this.menu) {
          if (group.visible === false) continue
          result.push(this.createMenuGroup(createElement, group))
        }
      }

      return result
    },

    createMenuGroup(createElement, group) {
      return createElement(
        'ul',
        {
          class: {
            'navbar-nav': true,
            [group.class]: true
          }
        },
        this.createMenuItems(createElement, group)
      )
    },

    createMenuItems(createElement, group) {
      const result = []

      for (const link of group.links) {
        if (link.visible === false) continue
        result.push(this.createMenuItem(createElement, link))
      }

      return result
    },

    createMenuItem(createElement, link) {
      return createElement(
        'li',
        {
          class: {
            'nav-item': true,
            'dropdown': (link.links) ? true : false
          }
        },
        [
          this.createMenuLink(createElement, link),
          this.createMenuDropdown(createElement, link)
        ]
      )
    },

    createMenuLink(createElement, link) {
      return createElement(
        'fl-link',
        {
          class: {
            'nav-link': true,
            'dropdown-toggle': (link.links) ? true : false,
            [link.class]: (link.class) ? true : false
          },
          props: {
            to: (link.to) ? link.to : '',
            title: (link.title) ? link.title : null
          }
        }
      )
    },

    createMenuDropdown(createElement, link) {
      if (!link.links) return null
      return createElement(
        'ul',
        {
          class: {
            'dropdown-menu': true
          }
        },
        this.createMenuDropdownLinks(createElement, link)
      )
    },

    createMenuDropdownLinks(createElement, link) {
      const result = []

      for (const l of link.links) {
        if (l.visible === false) continue

        const lElement = createElement(
          'fl-link',
          {
            class: {
              'dropdown-item': true,
              [link.class]: (link.class) ? true : false
            },
            props: {
              to: (link.to) ? link.to : '',
              title: (link.title) ? link.title : null
            }
          }
        )

        result.push(createElement(
          'li',
          [lElement]
        ))
      }

      return result
    }
    **/
  }
}
