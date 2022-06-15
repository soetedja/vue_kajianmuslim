import axios from 'axios'
import { API_BASE } from '../../config'

import * as _ from './mutation-types'
import * as BASE_MUTATION_TYPES from '../base/mutation-types'

export const settingActions = {
  authorizeOauth2: ({ commit }, payload) => {
    commit(_.AUTHORIZE_OAUTH2)
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + payload.entity.SINGLE + `/authorizeOauth2`)
        .then(response => {
          commit(_.AUTHORIZE_OAUTH2_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents
          })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  revokeOauth2: ({ commit }, payload) => {
    commit(_.REVOKE_OAUTH2)
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + payload.entity.SINGLE + `/revokeOauth2`)
        .then(response => {
          commit(_.REVOKE_OAUTH2_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents
          })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  getAppSettings: ({ commit }, payload) => {
    commit(_.GET_APP_SETTINGS)
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + payload.entity.SINGLE + `/` + payload.entity.APP_SETTINGS)
        .then(response => {
          commit(_.GET_APP_SETTINGS_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents
          })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  sendTestMail: ({ commit }, payload) => {
    commit(_.SEND_TEST_MAIL)
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + payload.entity.SINGLE + `/sendTestMail`, payload.data)
        .then(response => {
          commit(_.SEND_TEST_MAIL_SUCCESS, {
            data: response.data
          })
          resolve(response.data)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
