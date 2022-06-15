import Vue from 'vue'
import Vuex from 'vuex'

// Base
import { baseGetters } from './base/base-getters'
import { baseActions } from './base/base-actions'
import { baseMutations } from './base/base-mutations'

// Status
import { status, statuses, allStatuses } from './status'
import { statusActions } from './status/actions'
import { statusGetters } from './status/getters'
import { statusMutations } from './status/mutations'

// User
import { user, users, signedInUser } from './user'
import { userActions } from './user/actions'
import { userGetters } from './user/getters'
import { userMutations } from './user/mutations'

// Entity
import { entity, entities, allEntities } from './entity'
// Event type
import { eventType, eventTypes, allEventTypes } from './event_type'
// Participant type
import { participantType, participantTypes, allParticipantTypes } from './participant_type'
// Privilege
import { privilege, privileges, allPrivileges } from './privilege'
// Role
import { role, roles, allRoles } from './role'

// Setting
import { setting, settings, allSettings, appSettings } from './setting'
import { settingActions } from './setting/actions'
import { settingGetters } from './setting/getters'
import { settingMutations } from './setting/mutations'

// Common
import { commonActions } from './common/actions'
import { commonMutations } from './common/mutations'
import { pages } from './common/pages'
import { commonGetters } from './common/getters'

// Menu
import { menus } from './menu'

// Resources
import { resource, resources, allResources } from './resource'
import { resourceActions } from './resource/actions'
import { resourceGetters } from './resource/getters'
import { resourceMutations } from './resource/mutations'

import { playgroundActions } from './playground/actions'

import { locationActions } from './location/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allEntities,
    allEventTypes,
    allParticipantTypes,
    allPrivileges,
    allResources,
    allRoles,
    allSettings,
    allStatuses,
    appSettings,
    entities,
    entity,
    eventType,
    eventTypes,
    menus,
    pages,
    participantType,
    participantTypes,
    privilege,
    privileges,
    resource,
    resources,
    role,
    roles,
    setting,
    settings,
    signedInUser,
    status,
    statuses,
    user,
    users
  },
  mutations: Object.assign(
    {},
    baseMutations,
    commonMutations,
    settingMutations,
    statusMutations,
    userMutations,
    resourceMutations
  ),
  getters: Object.assign(
    {},
    baseGetters,
    commonGetters,
    settingGetters,
    statusGetters,
    userGetters,
    resourceGetters
  ),
  actions: Object.assign(
    {},
    baseActions,
    commonActions,
    settingActions,
    statusActions,
    userActions,
    resourceActions,
    playgroundActions,
    locationActions
  )
})
