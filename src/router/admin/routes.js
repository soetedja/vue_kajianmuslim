import Dashboard from '@/pages/admin/dashboard/Index'

import DefaultIndex from '@/pages/Index'

// import Status from '@/pages/admin/status/Index'
import AddStatus from '@/pages/admin/status/Add'
import EditStatus from '@/pages/admin/status/Edit'
import StatusList from '@/pages/admin/status/Manage'

// import Entity from '@/pages/admin/entity/Index'
import AddEntity from '@/pages/admin/entity/Add'
import EditEntity from '@/pages/admin/entity/Edit'
import EntityList from '@/pages/admin/entity/Manage'

import AddSetting from '@/pages/admin/setting/Add'
import EditSetting from '@/pages/admin/setting/Edit'
import SettingList from '@/pages/admin/setting/Manage'

import AddUser from '@/pages/admin/user/Add'
import EditUser from '@/pages/admin/user/Edit'
import UserList from '@/pages/admin/user/Manage'

import AddPrivilege from '@/pages/admin/privilege/Add'
import EditPrivilege from '@/pages/admin/privilege/Edit.vue'
import PrivilegeList from '@/pages/admin/privilege/Manage'

import AddRole from '@/pages/admin/role/Add'
import EditRole from '@/pages/admin/role/Edit.vue'
import RoleList from '@/pages/admin/role/Manage'

import PlaygroundIndex from '@/pages/admin/playground/Index'
import UploadAvatar from '@/pages/admin/playground/UploadAvatar'
import MapPlayground from '@/pages/admin/playground/MapPlayground'

// /////////////// //
// ** Dashboard ** //
// /////////////// //
export const dashboard = {
  path: '',
  name: 'Dashboard',
  // route: '/#/admin/dashboard',
  active: false,
  component: Dashboard,
  meta: {
    title: 'Dashboard'
  },
  fa: 'fa-dashboard'
}

// //////////// //
// ** Status ** //
// //////////// //
const statusList = {
  path: '',
  name: 'StatusList',
  component: StatusList,
  meta: { title: 'List' }
}

const editStatus = {
  path: 'edit/:id',
  name: 'EditStatus',
  component: EditStatus,
  meta: { title: 'Edit' }
}

const addStatus = {
  path: 'add',
  name: 'AddStatus',
  component: AddStatus,
  meta: { title: 'Add' }
}

export const status = {
  path: 'status',
  // name: 'Status',
  component: DefaultIndex,
  meta: {
    title: 'Status'
  },
  active: false,
  fa: 'fa-tasks',
  children: [statusList, editStatus, addStatus]
}

// //////////// //
// ** Entity ** //
// //////////// //
const entityList = {
  path: '',
  name: 'EntityList',
  component: EntityList,
  meta: { title: 'List' }
}

const editEntity = {
  path: 'edit/:id',
  name: 'EditEntity',
  component: EditEntity,
  meta: { title: 'Edit' }
}

const addEntity = {
  path: 'add',
  name: 'AddEntity',
  component: AddEntity,
  meta: { title: 'Add' }
}

export const entity = {
  path: 'entity',
  // name: 'Entity',
  component: DefaultIndex,
  meta: {
    title: 'Entity'
  },
  active: false,
  fa: 'fa-th-large',
  children: [entityList, editEntity, addEntity]
}

// ////////// //
// ** User ** //
// ////////// //
const userList = {
  path: '',
  name: 'UserList',
  component: UserList,
  meta: { title: 'List' }
}

const editUser = {
  path: 'edit/:id',
  name: 'EditUser',
  component: EditUser,
  meta: { title: 'Edit' }
}

const addUser = {
  path: 'add',
  name: 'AddUser',
  component: AddUser,
  meta: { title: 'Add' }
}

export const user = {
  path: 'user',
  // name: 'User',
  component: DefaultIndex,
  meta: {
    title: 'User'
  },
  active: false,
  fa: 'fa-users',
  children: [userList, editUser, addUser]
}

// ///////////// //
// ** Setting ** //
// ///////////// //
const settingList = {
  path: '',
  name: 'SettingList',
  component: SettingList,
  meta: { title: 'List' }
}

const editSetting = {
  path: 'edit/:id',
  name: 'EditSetting',
  component: EditSetting,
  meta: { title: 'Edit' }
}

const addSetting = {
  path: 'add',
  name: 'AddSetting',
  component: AddSetting,
  meta: { title: 'Add' }
}

export const setting = {
  path: 'setting',
  // name: 'Setting',
  component: DefaultIndex,
  meta: {
    title: 'Setting'
  },
  active: false,
  fa: 'fa-gear',
  children: [settingList, editSetting, addSetting]
}

// /////////////// //
// ** Privilege ** //
// /////////////// //
const privilegeList = {
  path: '',
  name: 'PrivilegeList',
  component: PrivilegeList,
  meta: { title: 'List' }
}

const editPrivilege = {
  path: 'edit/:id',
  name: 'EditPrivilege',
  component: EditPrivilege,
  meta: { title: 'Edit' }
}

const addPrivilege = {
  path: 'add',
  name: 'AddPrivilege',
  component: AddPrivilege,
  meta: { title: 'Add' }
}

export const privilege = {
  path: 'privilege',
  // name: 'Privilege',
  component: DefaultIndex,
  meta: {
    title: 'Privilege'
  },
  active: false,
  fa: 'fa-key',
  children: [privilegeList, editPrivilege, addPrivilege]
}

// /////////////// //
// ** Role ** //
// /////////////// //
const roleList = {
  path: '',
  name: 'RoleList',
  component: RoleList,
  meta: { title: 'List' }
}

const editRole = {
  path: 'edit/:id',
  name: 'EditRole',
  component: EditRole,
  meta: { title: 'Edit' }
}

const addRole = {
  path: 'add',
  name: 'AddRole',
  component: AddRole,
  meta: { title: 'Add' }
}

export const role = {
  path: 'role',
  // name: 'Role',
  component: DefaultIndex,
  meta: {
    title: 'Role'
  },
  active: false,
  fa: 'fa-check-circle',
  children: [roleList, editRole, addRole]
}

const playgroundPage = {
  path: '',
  name: 'Playground',
  component: PlaygroundIndex,
  meta: { title: 'Playground' }
}

const uploadAvatarPage = {
  path: 'uploadAvatar',
  name: 'UploadAvatar',
  component: UploadAvatar,
  meta: { title: 'UploadAvatar' }
}

const mapPlaygroundPage = {
  path: 'mapPlayground',
  name: 'MapPlayground',
  component: MapPlayground,
  meta: { title: 'MapPlayground' }
}

export const playground = {
  path: 'playground',
  // name: 'Playground',
  component: DefaultIndex,
  meta: {
    title: 'Playground'
  },
  active: false,
  fa: 'fa-play',
  children: [playgroundPage, uploadAvatarPage, mapPlaygroundPage]
}
