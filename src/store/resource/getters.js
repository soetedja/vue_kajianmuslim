import { ENTITY } from '../../config'

export const resourceGetters = {
  allResources: (state, getters) => entity => {
    return state[ENTITY.RESOURCE.ALL]
  }
}
