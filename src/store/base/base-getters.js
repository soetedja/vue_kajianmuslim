export const baseGetters = {
  get: (state, getters) => entities => {
    return state[entities]
  },
  getById: (state, getters) => (id, ENTITY) => {
    var collections = getters.get(ENTITY.COLLECTION)
    if (collections !== undefined && collections.length > 0) {
      return getters.get(ENTITY.COLLECTION).filter(p => p.id === id)[0]
    } else {
      return state[ENTITY.SINGLE] !== undefined ? state[ENTITY.SINGLE] : {}
    }
  }
}
