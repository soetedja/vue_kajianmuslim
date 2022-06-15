<template>
<div class="pull-right col-xs-4 form-group input-group">
  <input v-model="query" type="search" class="form-control" :placeholder="placeholder" autocomplete="off">
  <span class="input-group-btn">
    <button type="button" class="btn btn-primary">
      <i class="fas fa-search"></i>
    </button>
  </span>
</div>
</template>

<script>
import options from '../options'

var executionTime = 100 // in milisecond
var countDown = executionTime
var isTimerStarted = false

export default {
  props: {
    value: {
      required: true
    },

    placeholder: {
      type: String,
      default: options.language.searchPlaceholder
    }
  },

  data: () => ({ query: '' }),

  created () {
    this.query = this.value
  },

  watch: {
    query (val) {
      countDown = executionTime
      if (!isTimerStarted) {
        isTimerStarted = true
        this.startTimer()
      }
    }
  },
  methods: {
    startTimer () {
      var self = this
      setTimeout(function () {
        countDown--
        if (!countDown) {
          isTimerStarted = false
          self.$emit('input', self.$data.query)
        } else {
          self.startTimer()
        }
      }, 1)
    }
  }
}
</script>
