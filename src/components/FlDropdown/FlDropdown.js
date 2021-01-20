import FlLink from '../FlLink'

export default {
  name: 'FlDropdown',

  data: function() {
    return {
      show: false
    }
  },

  props: {
    container: {
      type: String,
      default: 'div'
    },

    type: {
      type: String,
      default: 'link'
    },

    title: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      required: true
    },

    className: String,
    handlerClassName: String
  },

  components: {
    FlLink
  },

  render: function(createElement) {
    const elements = []

    if (this.type === 'button') elements.push(this.createButton(createElement))
    else elements.push(this.createLink(createElement))

    elements.push(this.createDropdown(createElement))

    return createElement(
      this.container,
      {
        class: {
          'fl-dropdown': true,
          'dropdown': true,
          [this.className]: (this.className) ? true : false
        }
      },
      elements
    )
  },

  methods: {
    createLink(createElement) {
      let self = this
      return createElement(
        'a',
        {
          attrs: {
            href: '#'
          },
          class: {
            [this.handlerClassName]: (this.handlerClassName) ? true : false,
            'show': this.show
          },
          on: {
            click: function(event) {
              event.preventDefault()
              self.show = !self.show
              return
            }
          }
        },
        [ this.title ]
      )
    },

    createButton(createElement) {

    },

    createDropdown(createElement) {
      const elements = []

      if (this.items) {
        for (const item of this.items) {
          const element = this.createDropdownLink(createElement, item)
          if (element) elements.push(element)
        }
      }

      return createElement(
        'ul',
        {
          class: {
            'dropdown-menu': true,
            'show': this.show
          }
        },
        elements
      )
    },

    createDropdownLink(createElement, link) {
      let self = this
      let element = createElement(
        'fl-link',
        {
          class: {
            'dropdown-item': true
          },
          props: {
            to: link.to,
            title: link.title
          },
          nativeOn: {
            click: function(event) {
              self.show = !self.show
            }
          }
        }
      )

      return createElement(
        'li',
        {},
        [ element ]
      )
    }
  }
}
