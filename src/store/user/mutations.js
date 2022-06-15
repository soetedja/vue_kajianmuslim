import * as _ from './mutation-types'
import { ENTITY } from '@/config'

// import toastr from 'toastr'

export const userMutations = {
  [_.GET_SIGNED_IN_USER_SUCCESS]: (state, payload) => {
    state[ENTITY.USER.SIGNED_IN_USER] = payload.data
  },
  [_.GET_SIGNED_OUT_USER_SUCCESS]: (state, payload) => {
    state[ENTITY.USER.SIGNED_IN_USER] = {}
  }
}
