export default {
  name: 'FlFooter',

  render: function(createElement) {
    return createElement(
      'div',
      {
        class: this.getClasses
      },
      this.$slots.default
    )
  },

  computed: {
    getClasses() {
      const classes = {
        'fl-footer': true
      }
      
      if (this.$fj.options.footer.class) {
        const c = this.$fj.options.footer.class.split(' ')
        for (const cc of c) {
          classes[cc] = true
        }
      }

      return classes
    }
  }
}
