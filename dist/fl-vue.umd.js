(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['fl-vue'] = {}));
}(this, (function (exports) { 'use strict';

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
          class: {
            [this.handlerClassName]: this.handlerClassName ? true : false,
            'show': this.show
          },
          on: {
            click: function () {
              self.show = !self.show;
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
        return createElement('li', {}, [createElement('fl-link', {
          class: {
            'dropdown-item': true
          },
          props: {
            to: link.to,
            title: link.title
          }
        })]);
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
      return this.ce(createElement, 'nav', 'fl-navbar navbar navbar-expand-lg', [this.createContainer(createElement)]);
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

  var FlHeader = {
    name: 'FlHeader',
    render: function (createElement) {
      return createElement('div', {
        class: {
          'fl-header': true
        }
      }, this.$slots.default);
    }
  };

  var FlSidebar = {
    name: 'FlSidebar',
    render: function (createElement) {
      return createElement('div', {
        class: {
          'fl-sidebar': true
        }
      }, this.$slots.default);
    }
  };

  var FlContent = {
    name: 'FlContent',
    render: function (createElement) {
      return createElement('div', {
        class: {
          'fl-content': true
        }
      }, this.$slots.default);
    }
  };

  var FlFooter = {
    name: 'FlFooter',
    render: function (createElement) {
      return createElement('div', {
        class: {
          'fl-footer': true
        }
      }, this.$slots.default);
    }
  };

  var FlCode = {
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
    render: function (createElement) {
      const pre = createElement('pre', [this.source]);
      return createElement('code', {
        class: {
          'fl-content': true
        }
      }, [pre]);
    }
  };

  exports.FlAxios = axios_1;
  exports.FlCode = FlCode;
  exports.FlContent = FlContent;
  exports.FlDropdown = FlDropdown;
  exports.FlFooter = FlFooter;
  exports.FlHeader = FlHeader;
  exports.FlLink = FlLink;
  exports.FlNavbar = FlNavbar;
  exports.FlSidebar = FlSidebar;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
