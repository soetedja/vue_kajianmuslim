<template>
  <!-- <div class="form-group form-control-default"  :class="{'required': required === 'true' || this.$props.required === ''}">
    <label :for="fieldName" :class="{'disabled': fdisabled }">{{ $resources(fieldText) }}</label>
    <input 
      type="text" 
      :placeholder="$resources(fieldText)" 
      v-model="internalValue"
      v-validate="validate"
      :name="fieldName"
      :disabled="fdisabled"
      :class="{'form-control': true, 'error': errors.has(fieldName) }" />
      <span class="small text-danger" v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</span>
  </div>  -->
  
  <div class="form-group form-control-select"  :class="{'required': required === 'true' || this.$props.required === ''}">
    <label :for="fieldName" :class="{'disabled': fdisabled }">{{ $resources(fieldText) }}</label>
    <select
      data-none-selected-text=""
      v-validate="validate"
      :name="fieldName"
      class="selectpicker"
      :ref="fieldName"
      v-model="internalValue"
      :disabled="fdisabled"
      :class="{'form-control': true, 'error': errors.has(fieldName) }" >
      <option v-bind:value="item.id" v-bind:key="key" v-for="(item, key) in options">{{item.name}}</option>
    </select>
    <span class="small text-danger" v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</span>
  </div> 
</template>

<script>
export default {
  inject: ['$validator'],
  props: ['value', 'fieldName', 'fieldText', 'options', 'disabled', 'required'],
  data: function () {
    return {
      validate: generateValidation(this.$props),
      fdisabled: this.$props.disabled === 'true' || this.$props.disabled === '',
      internalValue: ''
    }
  },
  watch: {
    'internalValue': function () {
      this.$emit('input', this.internalValue)
    },
    'value': function () {
      this.internalValue = this.value
    }
  },
  created: function () {
    this.internalValue = this.value
  },
  updated () {
    $(this.$refs[this.$props.fieldName]).selectpicker('refresh')
  },
  computed: {
  }
}

function generateValidation (props) {
  var validation = ''
  if (props.required === 'true' || props.required === '') validation += 'required|'
  if (props.email === 'true' || props.email === '') validation += 'email|'
  return validation
}
</script>

<style scoped>

</style>