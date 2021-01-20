import merge from 'lodash/merge'

import FlAxios from './axios'

import FlNavbar from './components/FlNavbar'
import FlHeader from './components/FlHeader'
import FlSidebar from './components/FlSidebar'
import FlContent from './components/FlContent'
import FlFooter from './components/FlFooter'

import FlDropdown from './components/FlDropdown'
import FlLink from './components/FlLink'
import FlCode from './components/FlCode'

export default {
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
    }
    const options = merge(def_options, app_options)

    Vue.prototype.$fj = options

  }
}

export {
  FlAxios,

  FlNavbar,
  FlHeader,
  FlSidebar,
  FlContent,
  FlFooter,

  FlDropdown,
  FlLink,
  FlCode
}
