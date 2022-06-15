import axios from 'axios'
import * as TYPES from './mutation-types'
import { API_BASE } from '@/config'
import { ERROR_MSG } from '@/store/base/mutation-types'

export const commonActions = {
  setNavigation ({ commit }, payload) {
    commit(TYPES.SET_NAVIGATION, payload)
  },
  setBreadcrumbs ({ commit }, payload) {
    commit(TYPES.SET_BREADCRUMBS, payload)
  },
  showLoader ({ commit }, payload) {
    commit(TYPES.SHOW_LOADER, payload)
  },
  getRegenciesByProvinceId ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/regency/getByProvinceId`, payload)
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({ id: '', option: true })
          }
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  getDistrictsByRegencyId ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/district/getByRegencyId`, payload)
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({ id: '', option: true })
          }
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  getVillagesByDistrictId ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/village/getByDistrictId`, payload)
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({ id: '', option: true })
          }
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(ERROR_MSG, { error })
          reject(error)
        })
    })
  }
}
