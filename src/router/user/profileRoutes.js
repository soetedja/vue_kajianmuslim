// ////////////////// //
// ** User Profile ** //
// ////////////////// //

import Profile from '@/pages/user/profile/Index'
import EditProfile from '@/pages/user/profile/Edit'
import VerifyEmail from '@/pages/user/profile/VerifyEmail'
import PasswordReset from '@/pages/user/profile/PasswordReset'

const editProfile = {
  path: 'edit',
  name: 'EditProfile',
  component: EditProfile,
  meta: { title: 'Ubah' }
}

const verifyEmail = {
  path: 'verifyEmail',
  name: 'VerifyEmail',
  component: VerifyEmail,
  meta: { title: 'Verifikasi Email' }
}

const passwordReset = {
  path: 'passwordReset',
  name: 'PasswordReset',
  component: PasswordReset,
  meta: { title: 'Reset Password' }
}

const profile = {
  path: 'profile',
  name: 'profile',
  component: Profile,
  meta: {
    title: 'Profil'
  },
  active: false,
  fa: '',
  children: [editProfile, verifyEmail, passwordReset]
}

export default profile
