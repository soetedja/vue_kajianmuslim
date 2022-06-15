<template>
<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
  <hr v-if="this.separator == 'true' || this.separator == ''"/>
    <div class="sidebar-block">
      <h4 class="category">Versioning</h4>
      <div class="form-group form-control-default">
        <label class="disabled" for="created_at">Created At</label>
        <input 
          type="text" 
          placeholder="" 
          v-model="model.created_at"
          name="created_at"
          disabled="disabled"
          class="form-control" />
      </div>
      <div class="form-group form-control-default">
        <label class="disabled" for="modified_at">Modified at</label>
        <input 
          type="text" 
          placeholder="" 
          v-model="model.modified_at"
          name="modified_at"
          disabled="disabled"
          class="form-control" />
      </div>
      <div class="form-group form-control-default">
        <label class="disabled" for="created_by">Created By</label>
        <input 
          type="text" 
          placeholder="" 
          v-model="model.created_by"
          name="created_by"
          disabled="disabled"
          :class="{'form-control': true, 'error': errors.has('created_by') }" />
      </div>
      <div class="form-group form-control-default">
        <label class="disabled" dfor="modified_at">Modified by</label>
        <input 
          type="text" 
          placeholder="" 
          v-model="model.modified_by"
          v-validate="'required'"
          name="modified_by"
          disabled="disabled"
          :class="{'form-control': true, 'error': errors.has('modified_by') }" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Versioning',
  props: ['model', 'separator'],
  // data () {
  //   return {
  //     separator: this.separator
  //   }
  // },
  mounted: function () {
  }

}
</script>
