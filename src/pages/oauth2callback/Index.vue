<template>
<div class="st-pusher">
  <!-- <sidebar-admin></sidebar-admin> -->
  <div class="st-content">
    <div class="st-content-inner" id="content">
      <div class="col-md-12">
        
      </div>
    </div>
  </div>
  
  <div class="overlay">
    <div class="loading-spinner">
      <img src="../../assets/images/double-ring.gif" alt="loading.." width="100" height="100"/>
    </div>
  </div>
</div>
</template>

<script>
import SidebarAdmin from '@/components/admin/SidebarAdmin'
export default {
  name: 'Oauth2Callback',
  components: {
    sidebarAdmin: SidebarAdmin
  },
  created () {
    this.$store.dispatch('showLoader')
  },
  mounted: function () {
    if (this.$route.query.code) {
      this.$store.dispatch('oauth2Callback', {
        code: this.$route.query.code
      })
      .then(result => {
        this.$store.dispatch('showLoader')
        window.opener.reloadPage()
        window.close()
      })
      .catch(error => {
        console.log('error: ', error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
