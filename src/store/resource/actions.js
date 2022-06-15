import axios from 'axios'
import { API_BASE, ENTITY } from '../../config'
import * as BASE_MUTATION_TYPES from '../base/mutation-types'

import * as _ from './mutation-types'

export const resourceActions = {
  getAllResources ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + ENTITY.RESOURCE.SINGLE)
        .then(response => {
          commit(_.ALL_RESOURCES_SUCCESS, {
            data: response.data.contents.model
          })
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(BASE_MUTATION_TYPES.ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
