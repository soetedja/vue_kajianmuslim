<template>
<div id="app" class="st-container">
  <!-- Wrapper required for sidebar transitions -->
  <app-header v-if="!isCallback"></app-header>
  <!-- <sidebar-filter></sidebar-filter> -->
  <sidebar-menu v-if="!isCallback"></sidebar-menu>
  <!-- <user-edit></user-edit> -->
  <router-view></router-view>

  <app-footer v-if="!isCallback"></app-footer>
  
  <vue-progress-bar></vue-progress-bar>
</div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import SidebarMenu from './components/sidebar/SidebarMenu'
import toastr from 'toastr'
// import SidebarFilter from './components/SidebarFilter'
// import UserEdit from './components/administrator/UserEdit'
import bahasa from 'vee-validate/dist/locale/id'
import * as BASE_MUTATION_TYPES from './store/base/mutation-types'
import { ENTITY } from '@/config'

export default {
  name: 'app',
  data () {
    return {
      // showLoader: false
      isCallback: this.$router.currentRoute.name === 'oauth2callback'
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    SidebarMenu
    // sidebarFilter: SidebarFilter
    // userEdit: UserEdit
  },
  beforeCreate () {
  },
  created () {
    // Localize validation messages
    veeValidateLoc(this, 'id')

    this.$store.subscribe((mutation) => {
      if (mutation.payload) {
        switch (mutation.type) {
          case BASE_MUTATION_TYPES.SUCCESS_MSG:
            toastr.success(mutation.payload.message, mutation.payload.title !== undefined ? mutation.payload.title : this.$resources('CommonResources.Success'))
            break
          case BASE_MUTATION_TYPES.ERROR_MSG:
            if (mutation.payload.error) { // error from database
              if (mutation.payload.error.response) {
                toastr.error(mutation.payload.error.response.data.contents.messages[0].message, mutation.payload.title !== undefined ? mutation.payload.title : this.$resources('CommonResources.Fail'))
              } else {
                toastr.error(mutation.payload.error.stack, mutation.payload.error.message)
              }
            } else {
              toastr.error(mutation.payload.message, mutation.payload.title !== undefined ? mutation.payload.title : this.$resources('CommonResources.Fail'))
            }
            break
          case BASE_MUTATION_TYPES.VALIDATION_ERROR:
            toastr.error(this.$resources('CommonResources.EnsureFormIsValid'), this.$resources('CommonResources.ValidationError'))
            break
          case BASE_MUTATION_TYPES.ADD_SUCCESS:
          case BASE_MUTATION_TYPES.UPDATE_SUCCESS:
          case BASE_MUTATION_TYPES.REMOVE_SUCCESS:
            toastr.success(mutation.payload.data.messages[0].message, this.$resources('CommonResources.Success'))
            break
        }
      }
    })

    // Get logged in user data
    this.$store.dispatch('getSignedInUser')

    // Retrieve master data
    // this.$store.dispatch('getAll', {
    //   entity: ENTITY.STATUS,
    //   option: true
    // })
    // this.$store.dispatch('getStatusByEntity', {
    //   entity: 'PRIVILEGE',
    //   option: true
    // })
    // this.$store.dispatch('getAll', {
    //   entity: ENTITY.STATUS
    // })
    this.$store.dispatch('getAll', {
      entity: ENTITY.ENTITY,
      option: true
    })
    this.$store.dispatch('getAll', {
      entity: ENTITY.PROVINCE,
      option: false
    })
    this.$store.dispatch('getAll', {
      entity: ENTITY.GUEST_TYPE,
      option: true
    })
    this.$store.dispatch('getAllResources')
  },
  mounted: function () {
    require('@/assets/js/app/_collapsible')
  },
  computed: {
    // showLoader () {
    //   return this.$store.state.showLoader
    // }
  }
}

function veeValidateLoc ($this, loc) {
  // start with english locale.
  switch (loc) {
    case 'id':
      $this.$validator.localize(loc, {
        messages: bahasa.messages,
        attributes: $this.$store.getters.allResources().CommonResources
        // {
        //   email: 'Email',
        //   first_name: 'Nama depan',
        //   last_name: 'Nama belakang',
        //   password: 'Password',
        //   confirm: 'Konfirmasi',
        //   user_type: 'Tipe pengguna'
        // }
      })
      break
    default:
      break
  }
}
</script>

<style>
</style>
