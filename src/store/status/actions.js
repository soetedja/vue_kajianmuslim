import axios from 'axios'
import { API_BASE } from '../../config'
import * as BASE_MUTATION_TYPES from '../base/mutation-types'

import * as _ from './mutation-types'

export const statusActions = {
  getStatusByEntity: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/status/getByEntity`, {
          entity: payload.entity
        })
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({
              id: '',
              option: true
            })
          }
          commit(_.GET_BY_ENTITY_SUCCESS, {
            entity: 'status-' + payload.entity,
            data: response.data.contents.model
          })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
