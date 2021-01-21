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

  render: function(h) {
    if (this.blank) return this.createRemoteLink(h)
    if (this.$router) return this.createRouterLink(h)
    return this.createLink(h)
  },

  computed: {
    linkContent() {
      if (this.$slots.default) return this.$slots.default
      if (this.title) return this.title
      return ''
    }
  },

  methods: {
    createLink(h) {
      return h(
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

    createRouterLink(h) {
      return h(
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

    createRemoteLink(h) {
      return h(
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
