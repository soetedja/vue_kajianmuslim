import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import { DiscoverRoutes } from './discover'
import { AdminRoutes } from './admin'
import { EventRoutes } from './event'
import { Oauth2CallbackRoutes } from './oauth2callback'
import { UserRoutes } from './user'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/discover' },
    DiscoverRoutes,
    AdminRoutes,
    EventRoutes,
    Oauth2CallbackRoutes,
    UserRoutes
  ]
})
