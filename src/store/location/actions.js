import axios from 'axios'
import { API_BASE } from '../../config'

// import * as _ from './mutation-types'
import * as BASE_MUTATION_TYPES from '../base/mutation-types'

export const locationActions = {
  placeOptions: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/location/placeOptions`, payload)
        .then(response => {
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  addLocationByPlaceId: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/location/addLocationByPlaceId`, payload)
        .then(response => {
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
