export default {
  name: 'FlAlert',

  data: function() {
    return {
      visible: true
    }
  },

  props: {
    type: {
      type: String,
      default: 'info'
    },

    dismissible: Boolean
  },

  render: function(h) {
    if (!this.visible) return

    let self = this
    let elements = [
      this.$slots.default
    ]

    if (this.dismissible) {
      elements.push(h(
        'button',
        {
          class: 'btn-close',
          on: {
            click: function(event) {
              event.preventDefault()
              self.visible = false
            }
          }
        }
      ))
    }

    return h(
      'div',
      {
        class: {
          'alert': true,
          [`alert-${this.type}`]: true,
          'alert-dismissible fade': this.dismissible
        }
      },
      elements
    )
  }
}
