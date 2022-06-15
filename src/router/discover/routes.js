import List from '@/pages/discover/list/Index'
import Map from '@/pages/discover/map/Index'

export const map = {
  path: '',
  name: 'Map',
  component: Map,
  meta: {
    title: 'Map'
  },
  active: false,
  fa: 'fa-map-marker',
  children: []
}

export const list = {
  path: 'list',
  name: 'List',
  component: List,
  meta: {
    title: 'List'
  },
  active: false,
  fa: 'fa-list',
  children: []
}
