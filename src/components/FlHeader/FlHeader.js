export default {
  name: 'FlHeader',

  render: function(createElement) {
    return createElement(
      'div',
      {
        class: {
          'fl-header': true
        }
      },
      this.$slots.default
    )
  }
}
