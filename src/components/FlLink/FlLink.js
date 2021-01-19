export default {
  name: 'FlLink',

  props: {
    title: {
      type: String
    },

    to: {
      type: String,
      required: true
    },

    blank: {
      type: Boolean,
      default: false
    }
  },

  render: function(createElement) {
    if (this.blank) return this.createRemoteLink(createElement)
    if (this.$router) return this.createRouterLink(createElement)
    return this.createLink(createElement)
  },

  computed: {
    linkContent() {
      if (this.$slots.default) return this.$slots.default
      if (this.title) return this.title
      return ''
    }
  },

  methods: {
    createLink(createElement) {
      return createElement(
        'a',
        {
          attrs: {
            href: this.to
          },
          class: {
            'fl-link': true
          }
        },
        this.linkContent
      )
    },

    createRouterLink(createElement) {
      return createElement(
        'router-link',
        {
          attrs: {
            to: this.to
          },
          class: {
            'fl-link': true,
            'fl-link-router': true,
            [this.class]: (this.class) ? true : false
          }
        },
        this.linkContent
      )
    },

    createRemoteLink(createElement) {
      return createElement(
        'a',
        {
          attrs: {
            href: this.to,
            target: '_blank'
          },
          class: {
            'fl-link': true,
            'fl-link-remote': true,
            [this.class]: true
          }
        },
        this.linkContent
      )
    }
  }
}
