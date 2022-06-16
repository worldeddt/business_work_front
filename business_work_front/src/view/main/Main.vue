<template>
<div id="app">
  <span @click="backToTheLogin()">login</span>
    
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name:'Main',
  methods : {
    backToTheLogin() {
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>