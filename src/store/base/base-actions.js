import axios from 'axios'
import { API_BASE } from '../../config'
import * as _ from './mutation-types'

var CancelToken = axios.CancelToken
var cancel
var actionKey = []

export const baseActions = {
  getAll ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + payload.entity.SINGLE)
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({ id: '', option: true })
          }
          commit(_.GET_ALL_SUCCESS, {
            entity: payload.entity.ALL,
            data: response.data.contents.model
          })
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(_.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  getActive ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + payload.entity.SINGLE + `/getActive`)
        .then(response => {
          if (payload.option) {
            response.data.contents.model.unshift({ id: '', option: true })
          }
          commit(_.GET_ALL_SUCCESS, {
            entity: payload.entity.ACTIVE,
            data: response.data.contents.model
          })
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(_.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  getById: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE}/` + payload.entity + `/${payload.id}`)
        .then(response => {
          commit(_.GET_BY_ID_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents.model
          })
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(_.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  add: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE}/` + payload.entity.SINGLE, payload.data)
        .then(response => {
          commit(_.ADD_SUCCESS, {
            entity: payload.entity.COLLECTION,
            data: response.data.contents
          })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(_.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  update: ({ getters, commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_BASE}/` + payload.entity.SINGLE + `/${payload.id}`, payload.data)
        .then(response => {
          commit(_.UPDATE_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents
          })
          resolve(response.data.contents.model)
        })
        .catch(error => {
          commit(_.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  remove: ({ getters, commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_BASE}/` + payload.entity.SINGLE + `/${payload.id}`, payload)
        .then(response => {
          commit(_.REMOVE_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents
          })
          resolve(response.data.contents)
        })
        .catch(error => {
          commit(_.ERROR_MSG, { error })
          reject(error)
        })
    })
  },
  search: ({ getters, commit, dispatch }, payload) => {
    if (actionKey['search'] && cancel) cancel()
    return new Promise((resolve, reject) => {
      actionKey['search'] = true
      axios({
        method: 'post',
        url: `${API_BASE}/` + payload.entity.SINGLE + `/search`,
        data: payload.params,
        cancelToken: new CancelToken(function executor (c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
        .then(response => {
          actionKey['search'] = false
          commit(_.SEARCH_SUCCESS, {
            entity: payload.entity,
            data: response.data.contents
          })
          resolve(response.data.contents)
        })
        .catch(function (err) {
          if (axios.isCancel(err)) {
            // console.log(err)
          } else {
            commit(_.ERROR_MSG, { err })
          }
          reject(err)
        })
    })
  }
}
