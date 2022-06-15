<template>
<div class="border border-primary">
  <uiv-breadcrumbs :items="breadcrumbs"/>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  created () {
  },
  computed: {
    breadcrumbs () {
      return this.$store.getters.breadcrumbs
    }
  }
}
</script>
