// import { ENTITY } from '../../config'

export const statusGetters = {
  getStatusByEntity: (state, getters) => entity => {
    var stateName = 'status-' + entity
    return state[stateName]
    // var allStatuses = getters.getAll(ENTITY.STATUS.ALL)
    // if (allStatuses && allStatuses.length > 0) {
    //   return allStatuses.filter(p => p.entity === entity || p.option)
    // } else {
    //   return state[ENTITY.STATUS.ALL]
    // }
  }
}
