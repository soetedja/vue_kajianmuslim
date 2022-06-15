<template>
  <div class="contents">
    <div class="row">
      <!-- <div class="content-block">
        <h1 class="text-h3 content-heading">Create listing</h1>
      </div> -->
      <div v-if="status=='success'" class="alert alert-success alert-dismissable" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
        <span class="sr-only">Berhasil:</span>
        <strong style="text-transform:uppercase">Registrasi akun berhasil</strong><br/>
        <div style="margin:10px 15px">
          <span>Akun anda berhasil dibuat, silahkan verifikasi dengan mengklik link aktivasi yang telah dikirim ke email anda.</span>
        </div>
      </div>
      <div v-if="status=='resend'" class="alert alert-success alert-dismissable" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
        <span class="sr-only">Berhasil:</span>
        <strong style="text-transform:uppercase">Email verifikasi berhasil dikirim</strong><br/>
        <div style="margin:10px 15px">
          <span>Silahkan cek kembali email anda, dan lakukan verifikasi dengan mengklik link aktivasi.</span>
        </div>
      </div>

      <div v-if="status=='verify-success'" class="alert alert-success alert-dismissable" role="alert">
        <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
        <span class="sr-only">Berhasil:</span>
        <strong style="text-transform:uppercase">Email berhasil diverifikasi</strong><br/>
        <div style="margin:10px 15px">
          <span>Terima kasih telah melakukan verifikasi. Selamat bergabung di Kajianmuslim.id</span>
        </div>
        <div style="margin:0px 15px">
          <button class="btn btn-primary" @click.prevent="goToHomepage()">Ke Halaman Utama</button>
          <button class="btn btn-success" @click.prevent="goToEditProfile()">Lengkapi Profil</button>
        </div>
      </div>

      <div v-if="!isVerifying" class="alert alert-warning alert-dismissable" role="alert">
        <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span class="sr-only">Peringatan:</span>
        <strong style="text-transform:uppercase">Email belum terverifikasi</strong><br/>
        <div style="margin:10px 15px">
          <span>Cek kembali email anda dan ikuti instruksi untuk memverifikasi akun. Jika anda tidak menerima email atau sudah kadaluarsa,
            anda dapat mengirimnya ulang.</span>
        </div>
        <div v-if="email != null" style="margin:0px 15px" >
          <button :disabled="status=='resend'" class="btn btn-success" @click.prevent="resendVerification()">Kirim Ulang Email Verifikasi</button>
        </div>
      </div>
      <!-- <div class="content-block">
        <h4 class="category">Verifikasi email</h4>
        <span>
          Akun anda berhasil dibuat, silahkan verifikasi dengan mengklik link aktivasi yang telah dikirim ke email anda.
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
// import EventTypeForm from './_EventTypeForm'
// import { ENTITY } from '@/config'

export default {
  mounted: function () {
    this.$data.status = this.$route.query.status
    this.$data.email = this.$route.query.email
    this.$data.isVerifying = this.$route.query.email && this.$route.query.token
    if (this.$data.isVerifying) {
      this.$store.dispatch('verifyEmail', {
        email: this.$route.query.email,
        token: this.$route.query.token
      })
      .then(result => {
        this.$data.status = 'verify-success'
        // Directly get logged in user data
        this.$store.dispatch('getSignedInUser')
      })
      .catch(error => {
        console.log('error: ', error)
      })
    }
  },
  data () {
    return {
      status: '',
      isVerifying: false,
      email: ''
    }
  },
  computed: {
  },
  methods: {
    goToHomepage () {
      this.$router.push({ name: 'Map' })
    },
    goToEditProfile () {
      this.$router.push({ name: 'EditProfile' })
    },
    resendVerification () {
      this.$store.dispatch('resendVerification', {
        email: this.$route.query.email
      })
      .then(result => {
        if (result === true) {
          this.$data.status = 'resend'
        }
      })
      .catch(error => {
        console.log('error: ', error)
      })
    }
  },
  components: {
    // eventTypeForm: EventTypeForm
  }
}
</script>
