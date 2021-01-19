export default {
  name: 'FlFooter',

  render: function(createElement) {
    return createElement(
      'div',
      {
        class: {
          'fl-footer': true
        }
      },
      this.$slots.default
    )
  }
}
