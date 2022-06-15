import axios from 'axios'
import { API_BASE } from '../../config'

// import * as _ from './mutation-types'
import * as BASE_MUTATION_TYPES from '../base/mutation-types'

export const playgroundActions = {
  activeSession: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + `setting/activeSession`)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  saveImage: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + `setting/saveImage`, payload.data)
        .then(response => {
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
