import * as _ from './mutation-types'
import toastr from 'toastr'

export const settingMutations = {
  [_.AUTHORIZE_OAUTH2] (state) {
  },
  [_.AUTHORIZE_OAUTH2_SUCCESS] (state, payload) {
  },
  [_.REVOKE_OAUTH2] (state) {
  },
  [_.REVOKE_OAUTH2_SUCCESS] (state, payload) {
    toastr.success('Oauth2 was revoked successfully.', 'Success!')
  },
  [_.GET_APP_SETTINGS] (state) {
  },
  [_.GET_APP_SETTINGS_SUCCESS] (state, payload) {
    state[payload.entity.APP_SETTINGS] = payload.data
  },
  [_.SEND_TEST_MAIL]: (state, payload) => {
  },
  [_.SEND_TEST_MAIL_SUCCESS]: (state, payload) => {
    console.log(payload)
    if (payload.data.contents === true) {
      toastr.success(payload.data.contents, 'Success!')
    } else {
      toastr.error(payload.data.contents, 'Failed!')
    }
  }
}
