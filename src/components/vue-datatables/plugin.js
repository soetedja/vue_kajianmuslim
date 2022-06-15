import { merge } from './options'
import Search from './components/Search'
import Filter from './components/Filter'
import PerPage from './components/PerPage'
import DataTable from './components/DataTable'

export default {
  install (Vue, options = {}) {
    merge(options)

    Vue.component('datatable', DataTable)
    Vue.component('datatable-filter', Filter)
    Vue.component('datatable-search', Search)
    Vue.component('datatable-perpage', PerPage)
  }
}
