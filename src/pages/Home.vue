<template>
<!-- content push wrapper -->
<div class="st-pusher">
  <!-- <sidebar-filter></sidebar-filter> -->
  <!-- sidebar effects INSIDE of st-pusher: -->
  <!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->

  <!-- this is the wrapper for the content -->
  <div class="st-content">
    <!-- extra div for emulating position:fixed of the menu -->
    <div class="st-content-inner" id="content">
      <div class="col-md-12">
            <h1 class="text-h3 sidebar-heading">Hello world</h1>
      </div>
    </div>
    <!-- /st-content-inner -->
  </div>
  <!-- /st-content -->
</div>
<!-- /st-pusher -->
</template>

<script>
// import SidebarFilter from './SidebarFilter'
export default {
  name: 'HelloWorld',
  components: {
    // sidebarFilter: SidebarFilter
  },
  mounted: function () {
    // $('html').removeClass('sidebar-l1 sidebar-r1-xs').addClass('sidebar-l-sum-13')
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
