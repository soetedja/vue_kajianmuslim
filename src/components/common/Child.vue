<template>
  <div>
    <input type="text" v-model="internalValue">
  </div>
</template>

<script>
export default {
  // The child has a prop named 'value'. v-model will automatically bind to this prop
  props: ['value'],
  data: function () {
    return {
      internalValue: ''
    }
  },
  watch: {
    'internalValue': function () {
      // When the internal value changes, we $emit an event. Because this event is
      // named 'input', v-model will automatically update the parent value
      this.$emit('input', this.internalValue)
    },
    'value': function () {
      this.internalValue = this.value
    }
  },
  created: function () {
    // We initially sync the internalValue with the value passed in by the parent
    this.internalValue = this.value
  }
}
</script>

<style scoped>

</style>