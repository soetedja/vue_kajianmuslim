import { ENTITY } from '../../config'

export const userGetters = {
  getSignedInUser: (state, getters) => entity => {
    return state[ENTITY.USER.SIGNED_IN_USER]
  }
}
