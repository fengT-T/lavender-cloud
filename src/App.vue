<template>
  <div id="app">
    <f-nav></f-nav>
    <keep-alive>
      <router-view/>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import fNav from './components/Nav'
export default {
  name: 'App',
  components: {
    fNav
  },
  beforeMount () {
    this.$store.dispatch('getUser')
  }
}
</script>

<style>

</style>
