import * as _ from './mutation-types'

export const statusMutations = {
  [_.GET_BY_ENTITY_SUCCESS]: (state, payload) => {
    state[payload.entity] = payload.data
  }
}
