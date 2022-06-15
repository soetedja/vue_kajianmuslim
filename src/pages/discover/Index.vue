<template>
<div class="st-pusher">
  <sidebar-admin></sidebar-admin>
  <div class="st-content">
    <div class="st-content-inner padding-top-none" id="content">
      <!-- <div class="container-fluid"> -->
        <router-view></router-view>
      <!-- </div> -->
    </div>
  </div>
</div>
</template>

<script>
import SidebarAdmin from '../../components/admin/SidebarAdmin'
export default {
  name: 'IndexAdmin',
  components: {
    sidebarAdmin: SidebarAdmin
  },
  mounted: function () {
    $('html').removeClass('sidebar-l1 sidebar-r1-xs').addClass('sidebar-l-sum-13')
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
