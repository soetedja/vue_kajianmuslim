import Index from '@/pages/admin/Index'
import * as _ from './routes'

export const AdminRoutes = {
  id: 'admin',
  path: '/admin',
  name: 'Administration',
  fa: 'fa-gears',
  open: false,
  meta: {
    title: 'Administration'
  },
  component: Index,
  children: [
    _.dashboard,
    _.status,
    _.entity,
    _.user,
    _.privilege,
    _.role,
    _.setting,
    _.playground
  ]
}
