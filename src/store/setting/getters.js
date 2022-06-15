import { ENTITY } from '../../config'

export const settingGetters = {
  getAppSettings: (state, getters) => entity => {
    return state[ENTITY.SETTING.APP_SETTINGS]
  }
}
