<template>
<div>

  <div @click="submitForm()">
      login page
  </div>

</div>  
</template>

<script>
export default {
    name:'Login',
    methods : {
        async submitForm() {
            this.$router.push('main')
        }
    }
}
</script>

<style>

</style>