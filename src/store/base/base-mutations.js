import * as _ from './mutation-types'

export const baseMutations = {
  [_.GET_ALL_SUCCESS]: (state, payload) => {
    state[payload.entity] = payload.data
  },
  [_.GET_BY_ID_SUCCESS]: (state, payload) => {
    state[payload.entity] = payload.data
  },
  [_.UPDATE_SUCCESS]: (state, payload) => {
    state[payload.entity.SINGLE] = payload.data.model
    if (!state[payload.entity.COLLECTION]) return payload.data.model
    state[payload.entity.COLLECTION] = state[payload.entity.COLLECTION].map(p => {
      if (p.id === payload.data.model.id) {
        payload.data.model = { ...payload.data.model }
        return payload.data.model
      }
      return p
    })
  },
  [_.SEARCH_SUCCESS]: (state, payload) => {
    state[payload.entity.COLLECTION] = payload.data.model.items
  },
  [_.ADD_SUCCESS]: (state, payload) => {
    state[payload.entity].push(payload.data)
  },
  [_.REMOVE_SUCCESS]: (state, payload) => {
    const index = state[payload.entity.COLLECTION].findIndex(p => p.id === payload.data.id)
    state[payload.entity.COLLECTION].splice(index, 1)
  },
  [_.ERROR_MSG] (state, payload) {},
  [_.SUCCESS_MSG] (state, payload) {},
  [_.VALIDATION_ERROR] (state, payload) {}
}
