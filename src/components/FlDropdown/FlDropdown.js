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

  render: function(h) {
    const elements = []

    if (this.type === 'button') elements.push(this.createButton(h))
    else elements.push(this.createLink(h))

    elements.push(this.createDropdown(h))

    return h(
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
    createLink(h) {
      let self = this
      return h(
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

    createButton(h) {

    },

    createDropdown(h) {
      const elements = []

      if (this.items) {
        for (const item of this.items) {
          const element = this.createDropdownLink(h, item)
          if (element) elements.push(element)
        }
      }

      return h(
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

    createDropdownLink(h, link) {
      let self = this
      let element = h(
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

      return h(
        'li',
        [ element ]
      )
    }
  }
}
