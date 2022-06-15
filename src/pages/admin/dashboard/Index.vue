<template>
<!-- content push wrapper -->
<div class="st-pusher">
  <!-- sidebar effects INSIDE of st-pusher: -->
  <!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->

  <!-- this is the wrapper for the content -->
  <div class="st-content">
    <!-- extra div for emulating position:fixed of the menu -->
    <div class="st-content-inner padding-top-none" id="content">
      <div class="col-md-12">
        <h1 class="text-h3 sidebar-heading">Dashboard</h1>
        <p>Parent field1: {{parentObj.field1}}</p>  
        <child v-model="parentObj.field1"></child>
      </div>
    </div>
    <!-- /st-content-inner -->
  </div>
  <!-- /st-content -->
</div>
<!-- /st-pusher -->
</template>


<script>
import Child from '@/components/common/Child'

export default {
  data () {
    return {
      parentObj: {
        field1: 'Field 1'
      }
    }
  },
  created () {
  },
  updated () {
  },
  mounted: function () {
  },
  computed: {
  },
  methods: {
  },
  components: {
    child: Child
  }
}
</script>
