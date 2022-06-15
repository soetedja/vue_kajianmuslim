<template>
<div class="st-pusher">
  <!-- <sidebar-admin></sidebar-admin> -->
  <div class="st-content">
    <div class="st-content-inner" id="content">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import SidebarAdmin from '@/components/admin/SidebarAdmin'
export default {
  name: 'IndexAdmin',
  components: {
    // sidebarAdmin: SidebarAdmin
  },
  mounted: function () {
    $('html').removeClass('sidebar-l-sum-13').addClass('')
  }
}
</script>

<style scoped>

</style>
