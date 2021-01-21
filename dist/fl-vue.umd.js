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
    render: function (h) {
      if (this.blank) return this.createRemoteLink(h);
      if (this.$router) return this.createRouterLink(h);
      return this.createLink(h);
    },
    computed: {
      linkContent() {
        if (this.$slots.default) return this.$slots.default;
        if (this.title) return this.title;
        return '';
      }

    },
    methods: {
      createLink(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          class: {
            'fl-link': true
          }
        }, this.linkContent);
      },

      createRouterLink(h) {
        return h('router-link', {
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

      createRemoteLink(h) {
        return h('a', {
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
    render: function (h) {
      const elements = [];
      if (this.type === 'button') elements.push(this.createButton(h));else elements.push(this.createLink(h));
      elements.push(this.createDropdown(h));
      return h(this.container, {
        class: {
          'fl-dropdown': true,
          'dropdown': true,
          [this.className]: this.className ? true : false
        }
      }, elements);
    },
    methods: {
      createLink(h) {
        let self = this;
        return h('a', {
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

      createButton(h) {},

      createDropdown(h) {
        const elements = [];

        if (this.items) {
          for (const item of this.items) {
            const element = this.createDropdownLink(h, item);
            if (element) elements.push(element);
          }
        }

        return h('ul', {
          class: {
            'dropdown-menu': true,
            'show': this.show
          }
        }, elements);
      },

      createDropdownLink(h, link) {
        let self = this;
        let element = h('fl-link', {
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
        return h('li', [element]);
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
    render: function (h) {
      return this.ce(h, 'nav', this.getClasses, [this.createContainer(h)]);
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

      createContainer(h) {
        const elements = [];

        if (this.menu) {
          let menu = [];
          if (!Array.isArray(this.menu)) menu.push(this.menu);else menu = this.menu;

          for (const nav of menu) {
            let element;
            if (Array.isArray(nav)) element = this.createNavbarNav(h, {
              items: nav
            });else element = this.createNavbarNav(h, nav);
            if (element) elements.push(element);
          }
        }

        return this.ce(h, 'div', 'container', [this.$slots.default, ...elements]);
      },

      createNavbarNav(h, nav) {
        if (nav.visible === false) return;
        const elements = [];

        if (nav.items) {
          for (const item of nav.items) {
            if (item.dropdown) {
              if (!Array.isArray(item.dropdown)) throw new Error('Dropdown list is not an array.');
              const element = this.createNavDropdown(h, item);
              if (element) elements.push(element);
            } else {
              const element = this.createNavItem(h, item);
              if (element) elements.push(element);
            }
          }
        }

        return h('ul', {
          class: {
            'navbar-nav': true,
            [nav.className]: nav.className ? true : false
          }
        }, elements);
      },

      createNavItem(h, item) {
        if (item.visible === false) return;
        return this.ce(h, 'li', 'nav-item', [this.createNavLink(h, item)]);
      },

      createNavLink(h, item) {
        return h('fl-link', {
          class: 'nav-link',
          props: {
            to: item.to
          }
        }, [item.title]);
      },

      createNavDropdown(h, item) {
        if (item.visible === false) return;
        return h('fl-dropdown', {
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

  //
  //
  //
  //
  //
  //
  var script = {
    props: {
      relativeElementSelector: {
        type: String,
        required: true
      },
      offset: {
        type: Object,

        default() {
          return {
            top: 40,
            bottom: 40
          };
        },

        validator(offset) {
          if (typeof offset !== 'object') {
            return false;
          }

          const keys = Object.keys(offset);
          return keys.includes('top') && keys.includes('bottom');
        }

      },
      enabled: {
        type: Boolean,
        default: true
      },
      scrollAffix: {
        type: Boolean,
        default: false
      },
      scrollContainerSelector: {
        type: String,
        default: null
      }
    },
    computed: {
      relativeElement() {
        return document.querySelector(this.relativeElementSelector);
      },

      scrollContainer() {
        if (this.scrollContainerSelector) {
          return document.querySelector(this.scrollContainerSelector);
        }

        return window;
      },

      affixTopPos() {
        return this.affixRect.top + this.topOfScreen - this.offset.top - this.topPadding;
      },

      affixBottomPos() {
        return this.affixRect.bottom + this.topOfScreen + this.offset.bottom;
      },

      bottomOfScreen() {
        return this.topOfScreen + this.scrollContainer.innerHeight;
      },

      relativeElmTopPos() {
        return this.topOfScreen + this.relativeElement.getBoundingClientRect().top;
      },

      relativeElmBottomPos() {
        return this.topOfScreen + this.relativeElement.getBoundingClientRect().bottom;
      },

      screenIsPastAffix() {
        return this.bottomOfScreen >= this.affixBottomPos;
      },

      screenIsBeforeAffix() {
        return this.topOfScreen <= this.affixTopPos;
      },

      screenIsBeforeRelativeElm() {
        return this.topOfScreen <= this.relativeElmTopPos - this.offset.top;
      },

      screenIsPastRelativeElm() {
        return this.bottomOfScreen >= this.relativeElmBottomPos + this.offset.bottom;
      },

      screenIsInsideRelativeElm() {
        return !this.screenIsBeforeRelativeElm && !this.screenIsPastRelativeElm;
      }

    },

    data() {
      return {
        frameId: null,
        affixHeight: null,
        affixRect: null,
        affixInitialTop: null,
        relativeElmOffsetTop: null,
        topPadding: null,
        lastState: null,
        currentState: null,
        currentScrollAffix: null,
        topOfScreen: null,
        lastDistanceFromTop: null,
        scrollingUp: null,
        scrollingDown: null
      };
    },

    watch: {
      offset(val, oldVal) {
        if (val.top !== oldVal.top || val.bottom !== oldVal.bottom) {
          this.onScroll();
        }
      }

    },
    methods: {
      updateData() {
        this.topOfScreen = this.scrollContainer.scrollTop || window.pageYOffset;
        this.affixRect = this.$el.getBoundingClientRect();
        this.affixHeight = this.$el.offsetHeight;
        this.relativeElmOffsetTop = this.getOffsetTop(this.relativeElement);
      },

      handleScroll() {
        if (this.frameId) {
          return;
        }

        this.frameId = window.requestAnimationFrame(() => {
          this.onScroll();
          this.frameId = null;
        });
      },

      onScroll() {
        if (!this.enabled) {
          this.removeClasses();
          return;
        }

        this.updateData();
        const affixIsBiggerThanRelativeElement = this.affixHeight + this.offset.top >= this.relativeElement.offsetHeight;

        if (affixIsBiggerThanRelativeElement) {
          if (this.scrollAffix && this.currentScrollAffix !== 'scrollaffix-top') {
            this.setScrollAffixTop();
          } else if (this.currentState !== 'affix-top') {
            this.setAffixTop();
          }

          return;
        }

        const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
        const shouldUseScrollAffix = this.scrollAffix && affixTotalHeight > this.scrollContainer.innerHeight;

        if (shouldUseScrollAffix) {
          this.handleScrollAffix();
          return;
        }

        this.handleAffix();
      },

      handleAffix() {
        if (this.topOfScreen < this.relativeElmOffsetTop - this.offset.top) {
          this.setAffixTop();
        }

        if (this.topOfScreen >= this.relativeElmOffsetTop - this.offset.top && this.relativeElmBottomPos - this.offset.bottom >= this.topOfScreen + this.topPadding + this.affixHeight + this.offset.top) {
          this.setAffix();
        }

        if (this.relativeElmBottomPos - this.offset.bottom < this.topOfScreen + this.topPadding + this.affixHeight + this.offset.top) {
          this.setAffixBottom();
        }

        this.lastState = this.currentState;
      },

      handleScrollAffix() {
        this.setScrollingDirection();

        if (this.screenIsBeforeRelativeElm) {
          this.setScrollAffixTop();
        } else if (this.screenIsPastRelativeElm) {
          this.setScrollAffixBottom();
        } else if (this.screenIsInsideRelativeElm) {
          const shouldSetAffixScrolling = this.currentScrollAffix === 'scrollaffix-top' || this.currentScrollAffix === 'scrollaffix-bottom' || this.currentScrollAffix === 'scrollaffix-up' && this.scrollingDown || this.currentScrollAffix === 'scrollaffix-down' && this.scrollingUp;

          if (this.screenIsBeforeAffix && this.scrollingUp) {
            this.setScrollAffixUp();
          } else if (this.screenIsPastAffix && this.scrollingDown) {
            this.setScrollAffixDown();
          } else if (shouldSetAffixScrolling) {
            this.setScrollAffixScrolling();
          }
        }

        this.lastScrollAffixState = this.currentScrollAffix;
        this.lastDistanceFromTop = this.topOfScreen;
      },

      initScrollAffix() {
        if (this.bottomOfScreen < this.affixBottomPos) {
          this.setScrollAffixTop();
        } else if (this.screenIsInsideRelativeElm) {
          this.setScrollAffixDown();
        } else if (this.screenIsPastRelativeElm) {
          this.setScrollAffixBottom();
        } else {
          this.setScrollAffixScrolling();
        }
      },

      setScrollAffixScrolling() {
        this.currentScrollAffix = 'scrollaffix-scrolling';
        this.$el.style.top = "".concat(Math.floor(this.affixRect.top) + this.topOfScreen - this.affixInitialTop, "px");
        this.$el.style.bottom = 'auto';
        this.removeClasses();
        this.emitEvent();
      },

      setScrollAffixUp() {
        this.currentScrollAffix = 'scrollaffix-up';

        if (this.currentScrollAffix !== this.lastScrollAffixState) {
          this.$el.style.top = "".concat(this.topPadding + this.offset.top, "px");
          this.$el.style.bottom = 'auto';
          this.removeClasses();
          this.emitEvent();
          this.$el.classList.add('affix');
        }
      },

      setScrollAffixDown() {
        this.currentScrollAffix = 'scrollaffix-down';

        if (this.currentScrollAffix !== this.lastScrollAffixState) {
          this.$el.style.bottom = "".concat(this.offset.bottom, "px");
          this.$el.style.top = 'auto';
          this.removeClasses();
          this.emitEvent();
          this.$el.classList.add('affix');
        }
      },

      setScrollAffixTop() {
        this.currentScrollAffix = 'scrollaffix-top';
        this.$el.style.top = 0;
        this.$el.style.bottom = 'auto';
        this.removeClasses();
        this.emitEvent();
      },

      setScrollAffixBottom() {
        this.currentScrollAffix = 'scrollaffix-bottom';
        this.$el.style.top = "".concat(this.relativeElmBottomPos - this.affixInitialTop - this.affixHeight, "px");
        this.$el.style.bottom = 'auto';
        this.removeClasses();
        this.emitEvent();
      },

      setScrollingDirection() {
        if (this.topOfScreen > this.lastDistanceFromTop) {
          this.scrollingDown = true;
          this.scrollingUp = false;
        } else {
          this.scrollingUp = true;
          this.scrollingDown = false;
        }
      },

      setAffixTop() {
        this.currentState = 'affix-top';

        if (this.currentState !== this.lastState) {
          this.emitEvent();
          this.removeClasses();
          this.$el.classList.remove('affix');
          this.$el.classList.add('affix-top');
          this.$el.style.top = null;
        }
      },

      setAffix() {
        this.currentState = 'affix';
        this.$el.style.top = "".concat(this.topPadding + this.offset.top, "px");

        if (this.currentState !== this.lastState) {
          this.emitEvent();
          this.removeClasses();
          this.$el.classList.add('affix');
        }
      },

      setAffixBottom() {
        this.currentState = 'affix-bottom';
        this.$el.style.top = "".concat(this.relativeElement.offsetHeight - this.affixHeight - this.offset.bottom - this.topPadding, "px");

        if (this.currentState !== this.lastState) {
          this.emitEvent();
          this.removeClasses();
          this.$el.classList.add('affix-bottom');
        }
      },

      removeClasses() {
        this.$el.classList.remove('affix-top');
        this.$el.classList.remove('affix');
        this.$el.classList.remove('affix-bottom');
      },

      emitEvent() {
        if (this.scrollAffix && this.lastScrollAffixState && this.currentScrollAffix !== this.lastScrollAffixState) {
          this.$emit(this.currentScrollAffix.replace('-', ''));
        }

        if (this.lastState) {
          this.$emit(this.currentState.replace('-', ''));
        }
      },

      getOffsetTop(element) {
        let yPosition = 0;
        let nextElement = element;

        while (nextElement) {
          yPosition += nextElement.offsetTop;
          nextElement = nextElement.offsetParent;
        }

        return yPosition;
      }

    },

    mounted() {
      this.$el.classList.add('fl-affix');
      this.affixInitialTop = this.getOffsetTop(this.$el);
      this.topPadding = this.affixInitialTop - this.getOffsetTop(this.relativeElement);
      this.updateData();

      if (this.scrollAffix) {
        const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
        const shouldUseScrollAffix = this.scrollAffix && affixTotalHeight > this.scrollContainer.innerHeight;
        if (shouldUseScrollAffix) this.initScrollAffix();
      }

      this.onScroll();
      this.scrollContainer.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }

  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__ = script;
  /* template */

  var __vue_render__ = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm._t("default")], 2);
  };

  var __vue_staticRenderFns__ = [];
  /* style */

  const __vue_inject_styles__ = undefined;
  /* scoped */

  const __vue_scope_id__ = undefined;
  /* module identifier */

  const __vue_module_identifier__ = undefined;
  /* functional template */

  const __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__ = /*#__PURE__*/normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  var FlContent = {
    name: 'FlContent',
    components: {
      FlAffix: __vue_component__
    },
    render: function (h) {
      let row = h('div', {
        class: 'row h-100'
      }, [this.createSidebar(h), this.createContent(h)]);
      let container = h('div', {
        class: 'container flex-fill'
      }, [row]);
      return h('div', {
        class: 'fl-content-wrapper d-flex flex-column'
      }, [this.createHeader(h), container]);
    },
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
      createHeader(h) {
        if (!this.hasHeader) return;
        return h('div', {
          class: this.getHeaderClasses
        }, [h('router-view', {
          props: {
            name: 'header'
          }
        })]);
      },

      createSidebar(h) {
        if (!this.hasSidebar) return;
        return h('div', {
          class: this.getSidebarClasses
        }, [h('fl-affix', {
          props: {
            relativeElementSelector: '.fl-content',
            offset: {
              top: 0,
              bottom: 0
            }
          },
          attrs: {
            style: 'width: 300px;'
          }
        }, [h('router-view', {
          props: {
            name: 'sidebar'
          }
        })])]);
      },

      createContent(h) {
        return h('div', {
          class: this.getContentClasses
        }, [h('router-view')]);
      }

    }
  };

  var FlFooter = {
    name: 'FlFooter',
    render: function (h) {
      return h('div', {
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

  var FlAlert = {
    name: 'FlAlert',
    props: {
      type: {
        type: String,
        default: 'info'
      }
    },
    render: function (h) {
      return h('div', {
        class: {
          'alert': true,
          ["alert-".concat(this.type)]: true
        }
      }, this.$slots.default);
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
        default: 'markup'
      }
    },
    render: function (h, ctx) {
      const code = ctx.props.code || (ctx.children && ctx.children.length > 0 ? ctx.children[0].text : '');
      const language = ctx.props.language;
      const prismLanguage = Prism__default['default'].languages[language];
      const className = "language-".concat(language);
      return h('pre', {
        class: {
          'fl-content': true,
          'language-javascript': true
        }
      }, [h('code', {
        class: className,
        domProps: {
          innerHTML: Prism__default['default'].highlight(code, prismLanguage)
        }
      })]);
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

  exports.FlAffix = __vue_component__;
  exports.FlAlert = FlAlert;
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
