<template>
  <div id="app">
    <vue-doro />
  </div>
</template>

<script>
import VueDoro from '@/components/VueDoro'

export default {
  name: 'App',
  components: {
    VueDoro,
  },
}
</script>

<style lang="stylus">
  @import './styles/global.styl'
</style>
