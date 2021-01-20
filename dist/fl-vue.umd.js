(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/merge'), require('prism-es6'), require('prism-es6/themes/prism-tomorrow.css')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash/merge', 'prism-es6', 'prism-es6/themes/prism-tomorrow.css'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['fl-vue'] = {}, global.merge, global.Prism));
}(this, (function (exports, merge, Prism) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
  var Prism__default = /*#__PURE__*/_interopDefaultLegacy(Prism);

  const _axios = require('axios');

  const axiosRetry = require('axios-retry');

  const axios = _axios.create();

  const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
  };

  axiosRetry(axios, {
    retries: 2,
    retryDelay,
    retryCondition: axiosRetry.isRetryableError
  });
  var axios_1 = axios;

  var FlLink = {
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
    render: function (createElement) {
      if (this.blank) return this.createRemoteLink(createElement);
      if (this.$router) return this.createRouterLink(createElement);
      return this.createLink(createElement);
    },
    computed: {
      linkContent() {
        if (this.$slots.default) return this.$slots.default;
        if (this.title) return this.title;
        return '';
      }

    },
    methods: {
      createLink(createElement) {
        return createElement('a', {
          attrs: {
            href: this.to
          },
          class: {
            'fl-link': true
          }
        }, this.linkContent);
      },

      createRouterLink(createElement) {
        return createElement('router-link', {
          attrs: {
            to: this.to
          },
          class: {
            'fl-link': true,
            'fl-link-router': true,
            [this.class]: this.class ? true : false
          }
        }, this.linkContent);
      },

      createRemoteLink(createElement) {
        return createElement('a', {
          attrs: {
            href: this.to,
            target: '_blank'
          },
          class: {
            'fl-link': true,
            'fl-link-remote': true,
            [this.class]: true
          }
        }, this.linkContent);
      }

    }
  };

  var FlDropdown = {
    name: 'FlDropdown',
    data: function () {
      return {
        show: false
      };
    },
    props: {
      container: {
        type: String,
        default: 'div'
      },
      type: {
        type: String,
        default: 'link'
      },
      title: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      className: String,
      handlerClassName: String
    },
    components: {
      FlLink
    },
    render: function (createElement) {
      const elements = [];
      if (this.type === 'button') elements.push(this.createButton(createElement));else elements.push(this.createLink(createElement));
      elements.push(this.createDropdown(createElement));
      return createElement(this.container, {
        class: {
          'fl-dropdown': true,
          'dropdown': true,
          [this.className]: this.className ? true : false
        }
      }, elements);
    },
    methods: {
      createLink(createElement) {
        let self = this;
        return createElement('a', {
          attrs: {
            href: '#'
          },
          class: {
            [this.handlerClassName]: this.handlerClassName ? true : false,
            'show': this.show
          },
          on: {
            click: function (event) {
              event.preventDefault();
              self.show = !self.show;
              return;
            }
          }
        }, [this.title]);
      },

      createButton(createElement) {},

      createDropdown(createElement) {
        const elements = [];

        if (this.items) {
          for (const item of this.items) {
            const element = this.createDropdownLink(createElement, item);
            if (element) elements.push(element);
          }
        }

        return createElement('ul', {
          class: {
            'dropdown-menu': true,
            'show': this.show
          }
        }, elements);
      },

      createDropdownLink(createElement, link) {
        let self = this;
        let element = createElement('fl-link', {
          class: {
            'dropdown-item': true
          },
          props: {
            to: link.to,
            title: link.title
          },
          nativeOn: {
            click: function (event) {
              self.show = !self.show;
            }
          }
        });
        return createElement('li', {}, [element]);
      }

    }
  };

  var FlNavbar = {
    name: 'FlNavbar',
    props: {
      menu: {}
    },
    components: {
      FlLink,
      FlDropdown
    },
    render: function (createElement) {
      return this.ce(createElement, 'nav', this.getClasses, [this.createContainer(createElement)]);
    },
    computed: {
      getClasses() {
        const classes = {
          'fl-footer': true,
          'fl-navbar': true,
          'navbar': true,
          'navbar-expand-lg': true
        };

        if (this.$fj.options.navbar.class) {
          const c = this.$fj.options.navbar.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        return classes;
      }

    },
    methods: {
      ce(c, string, classNames, array) {
        return c(string, {
          class: classNames
        }, array);
      },

      createContainer(createElement) {
        const elements = [];

        if (this.menu) {
          let menu = [];
          if (!Array.isArray(this.menu)) menu.push(this.menu);else menu = this.menu;

          for (const nav of menu) {
            let element;
            if (Array.isArray(nav)) element = this.createNavbarNav(createElement, {
              items: nav
            });else element = this.createNavbarNav(createElement, nav);
            if (element) elements.push(element);
          }
        }

        return this.ce(createElement, 'div', 'container', [this.$slots.default, ...elements]);
      },

      createNavbarNav(createElement, nav) {
        if (nav.visible === false) return;
        const elements = [];

        if (nav.items) {
          for (const item of nav.items) {
            if (item.dropdown) {
              if (!Array.isArray(item.dropdown)) throw new Error('Dropdown list is not an array.');
              const element = this.createNavDropdown(createElement, item);
              if (element) elements.push(element);
            } else {
              const element = this.createNavItem(createElement, item);
              if (element) elements.push(element);
            }
          }
        }

        return createElement('ul', {
          class: {
            'navbar-nav': true,
            [nav.className]: nav.className ? true : false
          }
        }, elements);
      },

      createNavItem(createElement, item) {
        if (item.visible === false) return;
        return this.ce(createElement, 'li', 'nav-item', [this.createNavLink(createElement, item)]);
      },

      createNavLink(createElement, item) {
        return createElement('fl-link', {
          class: 'nav-link',
          props: {
            to: item.to
          }
        }, [item.title]);
      },

      createNavDropdown(createElement, item) {
        if (item.visible === false) return;
        return createElement('fl-dropdown', {
          props: {
            items: item.dropdown,
            title: item.title,
            className: 'nav-item',
            handlerClassName: 'nav-link dropdown-toggle',
            container: 'li'
          }
        });
      }

    }
  };

  var FlContent = {
    name: 'FlContent',
    data: function () {
      return {};
    },
    render: function (createElement) {
      let row = createElement('div', {
        class: 'row h-100'
      }, [this.createSidebar(createElement), this.createContent(createElement)]);
      let container = createElement('div', {
        class: 'container flex-fill'
      }, [row]);
      return createElement('div', {
        class: 'fl-content-wrapper d-flex flex-column'
      }, [this.createHeader(createElement), container]);
    },

    mounted() {},

    computed: {
      hasSidebar() {
        if (this.$route.matched[0] && this.$route.matched[0].components.sidebar) {
          return true;
        }

        return false;
      },

      hasHeader() {
        if (this.$route.matched[0] && this.$route.matched[0].components.header) {
          return true;
        }

        return false;
      },

      getHeaderClasses() {
        const classes = {
          'fl-header': true
        };

        if (this.$route.meta && this.$route.meta.header && this.$route.meta.header.class) {
          const c = this.$route.meta.header.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        if (this.$fj.options.header.class) {
          const c = this.$fj.options.header.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        return classes;
      },

      getSidebarClasses() {
        const classes = {
          'fl-sidebar': true,
          'col-md-3': true
        };

        if (this.$route.meta && this.$route.meta.sidebar && this.$route.meta.sidebar.class) {
          const c = this.$route.meta.sidebar.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        if (this.$fj.options.sidebar.class) {
          const c = this.$fj.options.sidebar.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        return classes;
      },

      getContentClasses() {
        const classes = {
          'fl-content': true,
          'col': true,
          'h-100': true
        };

        if (this.$route.meta && this.$route.meta.content && this.$route.meta.content.class) {
          const c = this.$route.meta.content.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        if (this.$fj.options.content.class) {
          const c = this.$fj.options.content.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        return classes;
      }

    },
    methods: {
      createHeader(createElement) {
        if (!this.hasHeader) return;
        return createElement('div', {
          class: this.getHeaderClasses
        }, [createElement('router-view', {
          props: {
            name: 'header'
          }
        })]);
      },

      createSidebar(createElement) {
        if (!this.hasSidebar) return;
        return createElement('div', {
          class: this.getSidebarClasses
        }, [createElement('router-view', {
          props: {
            name: 'sidebar'
          }
        })]);
      },

      createContent(createElement) {
        return createElement('div', {
          class: this.getContentClasses
        }, [createElement('router-view')]);
      }

    }
  };

  var FlFooter = {
    name: 'FlFooter',
    render: function (createElement) {
      return createElement('div', {
        class: this.getClasses
      }, this.$slots.default);
    },
    computed: {
      getClasses() {
        const classes = {
          'fl-footer': true
        };

        if (this.$fj.options.footer.class) {
          const c = this.$fj.options.footer.class.split(' ');

          for (const cc of c) {
            classes[cc] = true;
          }
        }

        return classes;
      }

    }
  };

  var FlCode = {
    name: 'FlCode',
    functional: true,
    props: {
      code: {
        type: String
      },
      language: {
        type: String,
        default: 'javascript'
      }
    },
    render: function (h, ctx) {
      const code = ctx.props.code || (ctx.children && ctx.children.length > 0 ? ctx.children[0].text : '');
      const pre = h('code', {
        domProps: {
          innerHTML: Prism__default['default'].highlight(code, Prism__default['default'].languages.javascript, 'javascript')
        }
      });
      return h('pre', {
        class: {
          'fl-content': true,
          'language-javascript': true
        }
      }, [pre]);
    },
    computed: {
      getContent() {
        return this.source;
      }

    }
  };

  var index = {
    install(Vue, app_options) {
      // Set options
      const def_options = {
        options: {
          navbar: {},
          header: {
            class: null
          },
          sidebar: {
            class: null,
            follow: true
          },
          content: {
            class: null
          },
          footer: {
            class: null
          }
        },
        language: {
          apiError: "Got an error while loading data from the API :(",
          apiFailed: "We've failed in any attempt made to process this list... We suck :(",
          listViewing: "Viewing %limit of %total items",
          pagination: {
            previous: "Previous",
            next: "Next"
          }
        }
      };
      const options = merge__default['default'](def_options, app_options);
      Vue.prototype.$fj = options;
    }

  };

  exports.FlAxios = axios_1;
  exports.FlCode = FlCode;
  exports.FlContent = FlContent;
  exports.FlDropdown = FlDropdown;
  exports.FlFooter = FlFooter;
  exports.FlLink = FlLink;
  exports.FlNavbar = FlNavbar;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
