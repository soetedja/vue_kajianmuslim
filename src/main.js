import * as uiv from 'uiv'
import App from './App'
import VeeValidate from 'vee-validate'
import Vue from 'vue'
import VueDataTables from './components/vue-datatables'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios'
import router from './router'
import store from './store'
import ToggleButton from 'vue-js-toggle-button'
import { ENTITY } from '@/config'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as _ from 'lodash'

require('./app-start/resources.js')
require('./app-start/startup.js')

var appOptions = $(this)
var appOption = require('../src/assets/js/app/_options')(appOptions)

// enable axios post cookie, default false
axios.defaults.withCredentials = true

// This is a global mixin, it is applied to every vue instance
Vue.mixin({
  methods: {
    $resources: function ($key) {
      var res = store.getters.allResources()
      var key = $key.split('.')
      if (res[key[0]] && res[key[0]][key[1]]) {
        return res[key[0]][key[1]].format(arguments)
      } else if (key[1] === undefined && res['CommonResources'] && res['CommonResources'][key[0]]) {  // TODO: for future dev. make the resource in one file
        return res['CommonResources'][key[0]].format(arguments)
      } else {
        return key[1] === undefined ? key[0] : key[1]
      }
    },
    $allProvinces: function ($key) {
      var provs = store.getters.get(ENTITY.PROVINCE.ALL)
      return provs !== undefined ? provs : []
    },
    $appOption: function ($key) {
      return appOption[$key]
    },
    $convertUTCDateToLocalDate: function (date) {
      if (!_.isDate(date)) date = new Date(date)
      // var year = date.getFullYear()
      // var month = date.getMonth()
      // var gdate = date.getDate()
      var hours = date.getHours()
      // var minutes = date.getMinutes()
      // var second = date.getSeconds()

      // date = new Date(Date.UTC(year, month, gdate, hours, minutes, second))
      // console.log(date)
      // return date
      // console.log(date)
      var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
      var offset = date.getTimezoneOffset() / 60
      newDate.setHours(hours - offset)
      return newDate
    }
  }
})

Vue.use(uiv, { prefix: 'uiv' })
Vue.use(VeeValidate)
Vue.use(VueDataTables)
Vue.use(ToggleButton)
Vue.use(VueProgressBar, {
  color: '#26a69a',
  failedColor: 'red',
  height: '3px'
})
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: 'AIzaSyDvFI1I-k3WIGKaWADJrBwFaiqmqGkl1QE',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
router.beforeEach((to, from, next) => {
  document.title = generateTitle(to.matched)
  store.dispatch('setNavigation', getNavigationPayload(to.path))
  store.dispatch('setBreadcrumbs', generateBreadcrumbs(to.matched))
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

function generateBreadcrumbs (matched) {
  var resultBreadcrumbs = []
  matched.map(m => {
    resultBreadcrumbs.push({
      text: m.meta.title,
      to: m.path,
      exact: true
    })
  })
  return resultBreadcrumbs
}

function generateTitle (matched) {
  var resultTitle = ''
  var cloneMatched = Object.assign([], matched)
  cloneMatched.reverse().map(m => {
    if (m.parent !== undefined) {
      resultTitle += m.meta.title + ' '
    }
  })
  resultTitle += '- Kajianmuslim.id'
  return resultTitle
}

function getNavigationPayload (path) {
  var res = path.split('/')
  return {
    parent: res[1],
    child: res[2]
  }
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    Vue.prototype.$Progress.start()
    return config
  },
  function (error) {
    console.log('request ', error)
    if (!axios.isCancel(error)) {
      Vue.prototype.$Progress.fail()
    }
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    Vue.prototype.$Progress.finish()
    return response
  },
function (error) {
  if (!axios.isCancel(error)) {
    Vue.prototype.$Progress.fail()
  }
  return Promise.reject(error)
})
