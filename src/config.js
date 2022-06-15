import * as LOCAL_CONFIG from './local-config'

export const API_BASE = LOCAL_CONFIG.API_BASE

export const ENTITY = {
  ENTITY: { SINGLE: 'entity', COLLECTION: 'entities', ALL: 'allEntities' },
  EVENT: { SINGLE: 'event', COLLECTION: 'events', ALL: 'allEvents' },
  EVENT_TYPE: { SINGLE: 'eventType', COLLECTION: 'eventTypes', ALL: 'allEventTypes', ACTIVE: 'activeEventTypes' },
  GUEST: { SINGLE: 'guest', COLLECTION: 'guests', ALL: 'allGuests', ACTIVE: 'activeGuests' },
  GUEST_TYPE: { SINGLE: 'guestType', COLLECTION: 'guestTypes', ALL: 'allGuestTypes', ACTIVE: 'activeGuestTypes' },
  LOCATION: { SINGLE: 'location', COLLECTION: 'locations', ALL: 'allLocations', ACTIVE: 'activeLocations' },
  LOCATION_TYPE: { SINGLE: 'locationType', COLLECTION: 'locationTypes', ALL: 'allLocationTypes', ACTIVE: 'activeLocationTypes' },
  PARTICIPANT_TYPE: { SINGLE: 'participantType', COLLECTION: 'participantTypes', ALL: 'allParticipantTypes', ACTIVE: 'activeParticipantTypes' },
  PRIVILEGE: { SINGLE: 'privilege', COLLECTION: 'privileges', ALL: 'allPrivileges', ACTIVE: 'activePrivileges' },
  PROVINCE: { SINGLE: 'province', COLLECTION: 'provinces', ALL: 'allProvinces' },
  RESOURCE: { SINGLE: 'resource', COLLECTION: 'resources', ALL: 'allResources' },
  ROLE: { SINGLE: 'role', COLLECTION: 'roles', ALL: 'allRoles' },
  SETTING: { SINGLE: 'setting', COLLECTION: 'settings', ALL: 'allSettings', APP_SETTINGS: 'appSettings' },
  STATUS: { SINGLE: 'status', COLLECTION: 'statuses', ALL: 'allStatuses' },
  USER: { SINGLE: 'user', COLLECTION: 'users', ALL: 'allUsers', SIGNED_IN_USER: 'signedInUser' }
}

export const DEFAULT_MARKER = {
  // id: this.lastId,
  position: {
    lat: 0,
    lng: 0
  },
  opacity: 1,
  draggable: false,
  enabled: true,
  clicked: 0,
  rightClicked: 0,
  dragended: 0,
  ifw: false,
  ifw2text: ''
  // icon: icons['info'].icon
}
