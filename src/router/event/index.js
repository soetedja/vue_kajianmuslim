import Index from '@/pages/event/Index'
import * as routes from './routes'

export const EventRoutes = {
  id: 'event',
  path: '/event',
  name: 'Event',
  fa: 'fa-bullhorn',
  open: false,
  meta: {
    title: 'Event'
  },
  component: Index,
  children: [
    routes.guest,
    routes.guestType,
    routes.event,
    routes.eventType,
    routes.participantType,
    routes.location,
    routes.locationType
  ]
}
