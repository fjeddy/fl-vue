export default {
  name: 'FlCode',

  props: {
    source: {
      type: String,
      required: true
    },

    language: {
      type: String,
      default: 'javascript'
    }
  },

  render: function(createElement) {
    const pre = createElement('pre', [
      this.source
    ])

    return createElement(
      'code',
      {
        class: {
          'fl-content': true
        }
      },
      [
        pre
      ]
    )
  }
}
