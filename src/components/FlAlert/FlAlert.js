export default {
  name: 'FlAlert',

  props: {
    type: {
      type: String,
      default: 'info'
    }
  },

  render: function(h) {
    return h(
      'div',
      {
        class: {
          'alert': true,
          [`alert-${this.type}`]: true
        }
      },
      this.$slots.default
    )
  }
}
