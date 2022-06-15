<template>
  <div class="contents">
    <div v-if="status=='sent'" class="alert alert-success alert-dismissable" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span class="sr-only">Berhasil:</span>
      <strong style="text-transform:uppercase">Email reset password berhasil dikirim</strong><br/>
      <div style="margin:10px 15px">
        <span>Silahkan cek email anda dan ikuti petunjuk untuk mereset password akun anda.</span>
      </div>
    </div>
    <form v-if="!isResetting" @submit.prevent="passwordReset">
      <div class="row">
        <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
          <div class="sidebar-block">
            <h4 class="category">Reset Password</h4>
            <div>
              <span>
                Masukkan alamat email anda. 
                Kami akan mengirimkan petunjuk untuk melakukan reset password.
              </span>
            </div><br />
            <div class="form-group form-control-default required">
              <!-- <label for="Email">Email</label> -->
              <input 
                type="text" 
                placeholder="Email" 
                v-model="model.email"
                v-validate="'required|email'"
                name="email"
                :class="{'form-control': true, 'error': errors.has('email') }" />
                <span class="small text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div> 
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6 pull-left">
          <hr />
          <div class="form-group new-button pull-right">
            <button class="button btn btn-primary">
              <i class="fas fa-paper-plane fa-fw"></i>
              <span>Kirim</span>
            </button>
            <!-- <a @click="back()" class="button btn btn-primary">
              <i class="fas fa-chevron-circle-left fa-fw"></i>
              <span>Back</span>
            </a> -->
          </div>
        </div>
      </div>
    </form>
    <form v-else @submit.prevent="submitPassword">
      <div class="row">
        <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
          <div class="sidebar-block">
            <h4 class="category">Reset Password</h4>
            <div>
              <span>
                Masukkan password baru anda.
              </span>
            </div><br />
            <!-- <input type="hidden" v-model="model.email" />
            <input type="hidden" v-model="model.token" /> -->
            <div class="form-group form-control-default required">
              <label for="Password">Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                v-model="model.password"
                v-validate="'required|min:6|confirmed:password_confirmation'"
                name="password"
                :class="{'form-control': true, 'error': errors.has('password') }" />
                <span class="small text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
            </div> 
            <div class="form-group form-control-default required">
              <label for="ConfirmPassword">Konfirmasi Password</label>
              <input 
                type="password" 
                placeholder="Konfirmasi" 
                v-model="model.password_confirmation"
                name="password_confirmation"
                data-vv-as="password"
                :class="{'form-control': true, 'error': errors.has('password_confirmation') }" />
                <span class="small text-danger" v-show="errors.has('password_confirmation')">{{ errors}}</span>
            </div> 
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6 pull-left">
          <hr />
          <div class="form-group new-button pull-right">
            <button class="button btn btn-primary">
              <i class="fas fa-paper-plane fa-fw"></i>
              <span>Kirim</span>
            </button>
            <a @click="back()" class="button btn btn-primary">
              <i class="fas fa-chevron-circle-left fa-fw"></i>
              <span>Batal</span>
            </a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
// import EventTypeForm from './_EventTypeForm'
// import { ENTITY } from '@/config'
import { VALIDATION_ERROR } from '@/store/base/mutation-types'

export default {
  mounted: function () {
  },
  created () {
    this.$data.isResetting = this.$route.query.email && this.$route.query.token
    this.$data.model.email = this.$route.query.email
    this.$data.model.token = this.$route.query.token
  },
  data () {
    return {
      status: '',
      isResetting: false,
      model: {
        email: 'soetedja@live.com'
      }
    }
  },
  computed: {
  },
  methods: {
    passwordReset () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch('passwordReset', {
              data: this.$data.model
            })
            .then(result => {
              if (result === true) {
                this.$data.status = 'sent'
              }
            })
            .catch(error => {
              console.log('error: ', error)
            })
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    submitPassword () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch('submitPassword', {
              data: this.$data.model
            })
            .then(result => {
              this.$router.push({ name: 'EditProfile' })
            })
            .catch(error => {
              console.log('error: ', error)
            })
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    back () {
      this.$router.push({name: 'Map'})
    }
  },
  components: {
    // eventTypeForm: EventTypeForm
  }
}
</script>
