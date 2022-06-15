<template>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fas fa-fw fa-user-plus"></i> Daftar
    </a>
    <div class="dropdown-menu dropdown-size-280">
      <form @submit.prevent="signUp">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group form-control-default required">
              <label for="first_name">Nama depan</label>
              <input 
                type="text"
                class="form-control"
                name="first_name"
                placeholder="Nama depan"
                v-validate="'required'"
                v-model="model.first_name"
                :class="{'form-control': true, 'error': errors.has('first_name') }"
                autofocus />
                <span class="small text-danger" v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group form-control-default required">
              <label for="last_name">Nama belakang</label>
              <input type="text" 
                class="form-control"
                name="last_name"
                placeholder="Nama belakang"
                v-model="model.last_name"
                v-validate="'required'"
                :class="{'form-control': true, 'error': errors.has('last_name') }"
                />
                <span class="small text-danger" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
            </div>
          </div>
        </div>
        <div class="form-group form-control-default required">
          <label for="email">Email</label>
          <input 
            type="email"
            class="form-control"
            name="email"
            v-validate="'required|email'"
            placeholder="Alamat email"
            v-model="model.email"
          />
          <span class="small text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group form-control-default required">
          <label for="password">Sandi</label>
          <input 
            type="password"
            class="form-control"
            name="password"
            placeholder="Sandi"
            v-validate="'required|min:6'"
            v-model="model.password"
            />
          <span class="small text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="form-group form-control-select required">
          <label for="user_type">Anda seorang</label>
          <select
            data-none-selected-text=""
            v-validate="'required'"
            name="user_type"
            class=""
            ref="user_type"
            v-model="model.user_type"
            :class="{'form-control': true, 'error': errors.has('user_type') }" >
            <option value=""></option>
            <option value="Male">Jamaah Ikhwan</option>
            <option value="Female">Jamaah Akhwat</option>
            <option value="Ustadz">Ustadz</option>
            <option value="Ustadzah">Ustadzah</option>
          </select>
          <span class="small text-danger" v-show="errors.has('user_type')">{{ errors.first('user_type') }}</span>
        </div>
        <div class="">
          <button type="submit" class="btn btn-primary">Daftar <i class="fas fa-user-plus"></i></button>
        </div>
        <div class="">
          <!-- <span>or</span> -->
          <hr />
        </div>
        <div class="">
          <button type="submit" @click.prevent="oauth2Login()" class="btn btn-primary google-signin"></button>
        </div>
      </form>
    </div>
  </li>
</template>

<script>
// import { ENTITY } from '@/config'
import { ERROR_MSG } from '@/store/base/mutation-types'

export default {
  name: 'LoginForm',
  components: {},
  data () {
    return {
      model: {
        first_name: 'test',
        last_name: 'last',
        email: 'test@test.com',
        password: 'password',
        user_type: 'Male'
      }
    }
  },
  created () {
    // this.$store.dispatch('getSignedInUser')
  },
  updated () {
  },
  computed: {
    signedInUser () {
      const signedInUser = this.$store.getters.getSignedInUser()
      return Object.assign({}, signedInUser)
    },
    statusesByEntity () {
      const statusesByEntity = this.$store.getters.getStatusByEntity('EVENT_TYPE')
      return Object.assign({}, statusesByEntity)
    }
  },
  methods: {
    signUp () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch('signUp', {
              data: this.model
            })
            .then(result => {
              if (result.model === true) {
                $('.navbar-right .dropdown').removeClass('open')
                this.$router.push({path: '/user/profile/verifyEmail', query: { status: 'success', email: this.model.email }})
              } else {
                this.$store.commit(ERROR_MSG, {
                  error: {
                    title: 'Error!',
                    message: result.messages
                  }
                })
              }
            })
            .catch(error => {
              console.log('error: ', error)
            })
        } else {
          this.$store.commit(ERROR_MSG, {
            error: {
              title: 'Kesalahan Validasi!',
              message: 'Pastikan formulir sudah benar.'
            }
          })
        }
      })
    },
    oauth2Login () {
      this.$store
        .dispatch('oauth2Login')
        .then(result => {
          if (!result.isAuthorized) {
            // to actually open the window..
            // window.open(result.authUrl, '_blank')
            var win = popupwindow(result.authUrl, 'Google Sign in', 500, 600)
            // window.open(result.authUrl, 'Google Sign in', 'width=800, height=600')
            // win.onload = function () { win.RunCallbackFunction = myFunc }
            win.onbeforeunload = reloadPage
          }
          // console.log(result)
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
    // myFunc () { alert(`Second func`) }
  }
}

function reloadPage () { } // fake function (real in index.html root)

function popupwindow (url, title, width, height) {
  var w = width
  var h = height
  var left = ((screen.width - width) / 2)
  var top = (screen.height / 2) - (h / 2)
  return window.open(url, title, 'titlebar=no, location=no, status=no, menubar=no, resizable=yes, scrollbars=1, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
}
</script>

<style scoped>
.navbar .dropdown-menu.dropdown-size-280 {
    min-width: 300px;
}
</style>
