import Index from '@/pages/oauth2callback/Index'
// import * as _ from './routes'

export const Oauth2CallbackRoutes = {
  id: 'oauth2callback',
  path: '/oauth2callback',
  name: 'oauth2callback',
  fa: 'fa-bullhorn',
  open: false,
  meta: {
    title: 'Oauth2 Callback'
  },
  component: Index
}
