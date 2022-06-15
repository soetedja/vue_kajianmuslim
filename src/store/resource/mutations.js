import * as _ from './mutation-types'

export const resourceMutations = {
  [_.ALL_RESOURCES_SUCCESS] (state, payload) {
    state.allResources = payload.data
  }
}
