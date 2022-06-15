<template>
  <div class="col-xs-8">
    <div class="show-entries">
      <span>{{ $resources("Show") }}</span>
      <select v-model="perPage" class="form-control">
        <option v-bind:key="index" v-for="(val, index) in options" :value="val">{{ val }}</option>
      </select>
      <span>{{ $resources("entries") }}</span>
    </div>
  </div>
</template>

<script>
import options from '../options'

export default {
  props: {
    value: {
      type: Number,
      required: true
    },

    options: {
      type: Array,
      default: () => options.perPageOptions
    }
  },

  data: () => ({ perPage: options.perPage }),

  created () {
    this.perPage = this.value
  },

  watch: {
    perPage (val) {
      this.$emit('input', val)
    }
  }
}
</script>
