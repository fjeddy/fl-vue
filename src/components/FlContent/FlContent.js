export default {
  name: 'FlContent',

  render: function(createElement) {
    return createElement(
      'div',
      {
        class: {
          'fl-content': true
        }
      },
      this.$slots.default
    )
  }
}
