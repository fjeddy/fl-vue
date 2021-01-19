export default {
  name: 'FlSidebar',

  render: function(createElement) {
    return createElement(
      'div',
      {
        class: {
          'fl-sidebar': true
        }
      },
      this.$slots.default
    )
  }
}
