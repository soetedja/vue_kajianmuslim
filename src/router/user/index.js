import Index from '@/pages/user/Index'
import profileRoutes from './profileRoutes'

export const UserRoutes = {
  id: 'user',
  path: '/user',
  name: 'user',
  fa: 'fa-user',
  open: false,
  meta: {
    title: 'User'
  },
  component: Index,
  children: [
    profileRoutes
  ]
}
