import axios from 'axios'
import { API_BASE, ENTITY } from '@/config'
import * as BASE_MUTATION_TYPES from '../base/mutation-types'

import * as _ from './mutation-types'

export const userActions = {
  oauth2Login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + ENTITY.USER.SINGLE + `/oauth2Login`)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  login: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + ENTITY.USER.SINGLE + `/login`, payload.data)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  signUp: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + ENTITY.USER.SINGLE + `/signUp`, payload.data)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  passwordReset: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + ENTITY.USER.SINGLE + `/passwordReset`, payload.data)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  submitPassword: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + ENTITY.USER.SINGLE + `/submitPassword`, payload.data)
        .then(response => {
          commit(BASE_MUTATION_TYPES.SUCCESS_MSG, { response })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  verifyEmail ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + ENTITY.USER.SINGLE + `/verifyEmail`, payload)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  resendVerification ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + ENTITY.USER.SINGLE + `/resendVerification`, payload)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  logout ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + ENTITY.USER.SINGLE + `/logout`)
        .then(response => {
          commit(_.GET_SIGNED_OUT_USER_SUCCESS)
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  getSignedInUser: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + ENTITY.USER.SINGLE + `/` + ENTITY.USER.SIGNED_IN_USER)
        .then(response => {
          commit(_.GET_SIGNED_IN_USER_SUCCESS, {
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
  oauth2Callback: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + ENTITY.USER.SINGLE + `/oauth2Callback?code=` + payload.code)
        .then(response => {
          // commit(_.GET_SIGNED_IN_USER_SUCCESS, {
          //   entity: ENTITY.USER.SIGNED_IN_USER,
          //   data: response.data.contents
          // })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  searchUserByEmail ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/user/searchByEmail`, payload)
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({ id: '', option: true })
          }
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
