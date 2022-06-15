<template>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#sidebar-menu" data-toggle="sidebar-menu" class="toggle pull-left visible-xs"><i class="fas fa-bars"></i></a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="#sidebar-edit" data-toggle="sidebar-menu" class="toggle pull-right visible-xs"><i class="fas fa-pencil"></i></a>
          <a class="navbar-brand" href="/#/">Kajianmuslim.id</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="main-nav">
          <form class="navbar-form navbar-left margin-none ">
            <div class="search-1">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-search"></i></span>
                <input type="text" class="form-control form-control-w-150" placeholder="Search ..">
              </div>
            </div>
          </form>
          <ul class="nav navbar-nav navbar-right ">
            <login-form v-if="signedInUser.id == null"/>
            <sign-up-form v-if="signedInUser.id == null"/>
            <!-- user -->
            <li v-show="signedInUser.id != null" class="dropdown user">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img :src="signedInUser.picture_url ? signedInUser.picture_url.thumbnail : ''" alt="" class="img-circle" /> {{ signedInUser.name }}<span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#"><i class="fas fa-user"></i>Profile</a></li>
                <li><a href="#"><i class="fas fa-wrench"></i>Settings</a></li>
                <li><a href="#" @click.prevent="logout()"><i class="fas fa-sign-out"></i>Logout</a></li>
              </ul>
            </li>
            <!-- // END user -->
          </ul>
        </div>
        <!-- /.navbar-collapse -->

      </div>
    </nav>


</template>

<script>
  import LoginForm from './LoginForm'
  import SignUpForm from './SignUpForm'

  export default {
    name: 'Header',
    created () {
    },
    computed: {
      signedInUser () {
        const signedInUser = this.$store.getters.getSignedInUser()
        return Object.assign({}, signedInUser)
      }
    },
    components: {
      loginForm: LoginForm,
      signUpForm: SignUpForm
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>
/* @media (min-width: 768px){
  .navbar .container-fluid .navbar-right:last-of-type {
    margin-right: 0px;
  }
} */
.caret {
  margin-left: 8px;
}
.navbar-nav>li>a.dropdown-toggle img {
    margin-right: 5px;
}
.navbar-nav>li>.dropdown-menu {
  width: 100%;
}
</style>