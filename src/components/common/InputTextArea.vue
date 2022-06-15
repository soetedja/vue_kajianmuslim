<template>
  <div class="form-group form-control-default" :class="{'required': required === 'true' || this.$props.required === ''}">
    <label :for="fieldName" :class="{'disabled': fdisabled }">{{ $resources(fieldText) }}</label>
    <textarea 
      :placeholder="$resources(fieldText)"
      class="form-control" 
      v-validate="validate"
      rows="5"
      v-model="internalValue"
      :name="fieldName"
      :disabled="fdisabled"
      :class="{'form-control': true, 'error': errors.has(fieldName) }">
    </textarea>
    <span class="small text-danger" v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</span>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: ['value', 'fieldName', 'fieldText', 'disabled', 'required'],
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
  computed: {
  }
}

function generateValidation (props) {
  var validation = ''
  if (props.required === 'true' || props.required === '') validation += 'required|'
  return validation
}
</script>

<style scoped>

</style>