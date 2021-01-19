'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

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

var FlNavbar = {
  name: 'FlNavbar',
  props: {
    menu: {
      type: Array
    }
  },
  components: {
    FlLink
  },
  render: function (createElement) {
    return createElement('nav', {
      class: {
        'fl-navbar': true,
        'navbar': true,
        'navbar-expand-lg': true
      }
    }, [this.navContainer(createElement)]);
  },
  methods: {
    navContainer(createElement) {
      return createElement('div', {
        class: {
          'container': true
        }
      }, [this.$slots.default, this.createMenus(createElement)]);
    },

    createMenus(createElement) {
      const result = [];

      if (this.menu) {
        for (const link of this.menu) {
          if (typeof link != 'object') throw new Error('Menu option is not an object or an array');

          if (Array.isArray(link)) ; else {
            link.links;

            var options = _objectWithoutPropertiesLoose(link, ["links"]);
          }

          if (options.visible && options.visible === false) continue;
          if (!link.links) result.push(this.createDropdown(createElement, link));
        }
      }

      return result;
    },

    createDropdown(createElement, link) {}
    /**
    createNavigation(createElement) {
      return createElement(
        'div',
        {
          class: {
            'container': true
          }
        },
        [
          this.$slots.default,
          ...this.createMenu(createElement)
        ]
      )
    },
     createMenu(createElement) {
      const result = []
       if (this.menu) {
        for (const group of this.menu) {
          if (group.visible === false) continue
          result.push(this.createMenuGroup(createElement, group))
        }
      }
       return result
    },
     createMenuGroup(createElement, group) {
      return createElement(
        'ul',
        {
          class: {
            'navbar-nav': true,
            [group.class]: true
          }
        },
        this.createMenuItems(createElement, group)
      )
    },
     createMenuItems(createElement, group) {
      const result = []
       for (const link of group.links) {
        if (link.visible === false) continue
        result.push(this.createMenuItem(createElement, link))
      }
       return result
    },
     createMenuItem(createElement, link) {
      return createElement(
        'li',
        {
          class: {
            'nav-item': true,
            'dropdown': (link.links) ? true : false
          }
        },
        [
          this.createMenuLink(createElement, link),
          this.createMenuDropdown(createElement, link)
        ]
      )
    },
     createMenuLink(createElement, link) {
      return createElement(
        'fl-link',
        {
          class: {
            'nav-link': true,
            'dropdown-toggle': (link.links) ? true : false,
            [link.class]: (link.class) ? true : false
          },
          props: {
            to: (link.to) ? link.to : '',
            title: (link.title) ? link.title : null
          }
        }
      )
    },
     createMenuDropdown(createElement, link) {
      if (!link.links) return null
      return createElement(
        'ul',
        {
          class: {
            'dropdown-menu': true
          }
        },
        this.createMenuDropdownLinks(createElement, link)
      )
    },
     createMenuDropdownLinks(createElement, link) {
      const result = []
       for (const l of link.links) {
        if (l.visible === false) continue
         const lElement = createElement(
          'fl-link',
          {
            class: {
              'dropdown-item': true,
              [link.class]: (link.class) ? true : false
            },
            props: {
              to: (link.to) ? link.to : '',
              title: (link.title) ? link.title : null
            }
          }
        )
         result.push(createElement(
          'li',
          [lElement]
        ))
      }
       return result
    }
    **/


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
exports.FlFooter = FlFooter;
exports.FlHeader = FlHeader;
exports.FlLink = FlLink;
exports.FlNavbar = FlNavbar;
exports.FlSidebar = FlSidebar;
