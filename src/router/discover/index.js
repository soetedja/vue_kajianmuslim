import Index from '@/pages/discover/Index'
import * as _ from './routes'

export const DiscoverRoutes = {
  id: 'discover',
  path: '/discover',
  name: 'Discover',
  fa: 'fa-star',
  open: false,
  meta: {
    title: 'Discover'
  },
  component: Index,
  children: [_.map, _.list]
}
