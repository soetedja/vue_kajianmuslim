<template>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fas fa-fw fa-lock"></i> Masuk
    </a>
    <div class="dropdown-menu dropdown-size-280">
      <form>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="fas fa-user"></i></span>
            <input 
              type="text" 
              class="form-control"
              placeholder="Username/email" 
              v-validate="'required'"
              v-model="model.username" 
              autofocus>
              <span class="small text-danger" v-show="errors.has('username')">{{ errors.first('username') }}</span>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="fas fa-shield"></i></span>
            <input 
              type="password" 
              class="form-control"
              placeholder="Password" 
              v-validate="'required'"
              v-model="model.password"
            >
          </div>
          <span class="small text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="">
          <button type="submit" @click.prevent="login()" class="btn btn-primary">Login <i class="fas fa-sign-in-alt"></i></button>
          <a href="" class="pull-right" @click.prevent="forgotPassword()">Lupa password? </a>
        </div>
        <div class="">
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
import { SUCCESS_MSG, ERROR_MSG } from '@/store/base/mutation-types'

export default {
  name: 'LoginForm',
  components: {},
  data () {
    return {
      model: {}
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    login () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch('login', {
              data: this.$data.model
            })
            .then(response => {
              if (response.valid === true) {
                this.$store.dispatch('getSignedInUser')
                this.$store.commit(SUCCESS_MSG, {
                  title: this.$resources('SuccessLogin'),
                  message: this.$resources('Welcome', response.name)
                })
              } else {
                this.$store.commit(ERROR_MSG, {
                  title: this.$resources('FailedToLogin'),
                  message: this.$resources('InvalidUsernamePassword')
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
    forgotPassword () {
      $('.navbar-right .dropdown').removeClass('open')
      this.$router.push({name: 'PasswordReset'})
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

<style>
</style>
