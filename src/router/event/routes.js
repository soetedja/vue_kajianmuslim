import DefaultIndex from '@/pages/Index'

import AddEvent from '@/pages/event/event/Add'
import EditEvent from '@/pages/event/event/Edit'
import EventList from '@/pages/event/event/Manage'

import AddEventType from '@/pages/event/event_type/Add'
import EditEventType from '@/pages/event/event_type/Edit'
import EventTypeList from '@/pages/event/event_type/Manage'

import AddParticipantType from '@/pages/event/participant_type/Add'
import EditParticipantType from '@/pages/event/participant_type/Edit'
import ParticipantTypeList from '@/pages/event/participant_type/Manage'

import AddLocationType from '@/pages/event/location_type/Add'
import EditLocationType from '@/pages/event/location_type/Edit'
import LocationTypeList from '@/pages/event/location_type/Manage'

import AddLocation from '@/pages/event/location/Add'
import EditLocation from '@/pages/event/location/Edit'
import LocationList from '@/pages/event/location/Manage'

import AddGuest from '@/pages/event/guest/Add'
import EditGuest from '@/pages/event/guest/Edit'
import GuestList from '@/pages/event/guest/Manage'

import AddGuestType from '@/pages/event/guest_type/Add'
import EditGuestType from '@/pages/event/guest_type/Edit'
import GuestTypeList from '@/pages/event/guest_type/Manage'

// //////////////// //
// ** Event Type ** //
// //////////////// //
const eventTypeList = {
  path: '',
  name: 'EventTypeList',
  component: EventTypeList,
  meta: { title: 'List' }
}

const editEventType = {
  path: 'edit/:id',
  name: 'EditEventType',
  component: EditEventType,
  meta: { title: 'Edit' }
}

const addEventType = {
  path: 'add',
  name: 'AddEventType',
  component: AddEventType,
  meta: { title: 'Add' }
}

export const eventType = {
  path: 'eventType',
  // name: 'EventType',
  component: DefaultIndex,
  meta: {
    title: 'Event Type'
  },
  active: false,
  fa: 'fa-th-list',
  children: [eventTypeList, editEventType, addEventType]
}

// /////////// //
// ** Event ** //
// /////////// //
const eventList = {
  path: '',
  name: 'EventList',
  component: EventList,
  meta: { title: 'List' }
}

const editEvent = {
  path: 'edit/:id',
  name: 'EditEvent',
  component: EditEvent,
  meta: { title: 'Edit' }
}

const addEvent = {
  path: 'add',
  name: 'AddEvent',
  component: AddEvent,
  meta: { title: 'Add' }
}

export const event = {
  path: 'event',
  // name: 'EventType',
  component: DefaultIndex,
  meta: {
    title: 'Event'
  },
  active: false,
  fa: 'fa-calendar-alt',
  children: [eventList, editEvent, addEvent]
}

// ////////////////////// //
// ** Participant Type ** //
// ////////////////////// //
const participantTypeList = {
  path: '',
  name: 'ParticipantTypeList',
  component: ParticipantTypeList,
  meta: { title: 'List' }
}

const editParticipantType = {
  path: 'edit/:id',
  name: 'EditParticipantType',
  component: EditParticipantType,
  meta: { title: 'Edit' }
}

const addParticipantType = {
  path: 'add',
  name: 'AddParticipantType',
  component: AddParticipantType,
  meta: { title: 'Add' }
}

export const participantType = {
  path: 'participantType',
  // name: 'ParticipantTypeType',
  component: DefaultIndex,
  meta: {
    title: 'Participant Type'
  },
  active: false,
  fa: 'fa-user-circle',
  children: [participantTypeList, editParticipantType, addParticipantType]
}

// /////////////////// //
// ** Location Type ** //
// /////////////////// //
const locationTypeList = {
  path: '',
  name: 'LocationTypeList',
  component: LocationTypeList,
  meta: { title: 'List' }
}

const editLocationType = {
  path: 'edit/:id',
  name: 'EditLocationType',
  component: EditLocationType,
  meta: { title: 'Edit' }
}

const addLocationType = {
  path: 'add',
  name: 'AddLocationType',
  component: AddLocationType,
  meta: { title: 'Add' }
}

export const locationType = {
  path: 'locationType',
  // name: 'LocationTypeType',
  component: DefaultIndex,
  meta: {
    title: 'Location Type'
  },
  active: false,
  fa: 'fa-map-signs',
  children: [locationTypeList, editLocationType, addLocationType]
}

// ////////////// //
// ** Location ** //
// ////////////// //
const locationList = {
  path: '',
  name: 'LocationList',
  component: LocationList,
  meta: { title: 'List' }
}

const editLocation = {
  path: 'edit/:id',
  name: 'EditLocation',
  component: EditLocation,
  meta: { title: 'Edit' }
}

const addLocation = {
  path: 'add',
  name: 'AddLocation',
  component: AddLocation,
  meta: { title: 'Add' }
}

export const location = {
  path: 'location',
  // name: 'LocationType',
  component: DefaultIndex,
  meta: {
    title: 'Location'
  },
  active: false,
  fa: 'fa-map-marker-alt',
  children: [locationList, editLocation, addLocation]
}

// //////////////// //
// ** Guest Type ** //
// //////////////// //
const guestTypeList = {
  path: '',
  name: 'GuestTypeList',
  component: GuestTypeList,
  meta: { title: 'List' }
}

const editGuestType = {
  path: 'edit/:id',
  name: 'EditGuestType',
  component: EditGuestType,
  meta: { title: 'Edit' }
}

const addGuestType = {
  path: 'add',
  name: 'AddGuestType',
  component: AddGuestType,
  meta: { title: 'Add' }
}

export const guestType = {
  path: 'guestType',
  // name: 'GuestTypeType',
  component: DefaultIndex,
  meta: {
    title: 'Guest Type'
  },
  active: false,
  fa: 'fa-list-alt',
  children: [guestTypeList, editGuestType, addGuestType]
}

// /////////// //
// ** Guest ** //
// /////////// //
const guestList = {
  path: '',
  name: 'GuestList',
  component: GuestList,
  meta: { title: 'List' }
}

const editGuest = {
  path: 'edit/:id',
  name: 'EditGuest',
  component: EditGuest,
  meta: { title: 'Edit' }
}

const addGuest = {
  path: 'add',
  name: 'AddGuest',
  component: AddGuest,
  meta: { title: 'Add' }
}

export const guest = {
  path: 'guest',
  // name: 'GuestType',
  component: DefaultIndex,
  meta: {
    title: 'Guest'
  },
  active: false,
  fa: 'fa-microphone',
  children: [guestList, editGuest, addGuest]
}
