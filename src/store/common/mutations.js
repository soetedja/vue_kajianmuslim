import * as _ from './mutation-types'

export const commonMutations = {
  [_.SET_NAVIGATION]: (state, payload) => {
    // console.log(payload)
    // console.log(state.menus)
    state.menus.map(m => {
      m.active = false
      if (m.id === payload.parent) {
        m.active = true
        m.open = true
      } else {
        m.open = $('#menu-' + m.id).is('.open')
      }
      var childs = Object.keys(m.children).map(function (key) {
        return m.children[key]
      })
      childs.map(c => {
        c.active = false
        if (c.path === payload.child) {
          c.active = true
        }
      })
    })
  },
  [_.SET_BREADCRUMBS]: (state, payload) => {
    state.pages.breadcrumbs = payload
  },
  [_.SHOW_LOADER]: (state) => {
    state.showLoader = true
  }
}
