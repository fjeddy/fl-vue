import Prism from 'prism-es6'
import 'prism-es6/themes/prism-tomorrow.css'

export default {
  name: 'FlCode',
  functional: true,
  props: {
    code: {
      type: String
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  render: function(h, ctx) {
    const code =
      ctx.props.code ||
      (ctx.children && ctx.children.length > 0 ? ctx.children[0].text : '')
    const language = ctx.props.language
    const prismLanguage = Prism.languages[language]
    const className = `language-${language}`

    return h(
      'pre',
      {
        class: {
          'fl-content': true,
          'language-javascript': true
        }
      },
      [
        h('code', {
          class: className,
          domProps: {
            innerHTML: Prism.highlight(code, prismLanguage)
          }
        })
      ]
    )
  },
  computed: {
    getContent() {
      return this.source
    }
  }
}
