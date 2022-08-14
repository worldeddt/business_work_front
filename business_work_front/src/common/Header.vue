<template>
  <v-card color="grey lighten-4" flat tile>
      <v-toolbar dark fixed>
        <v-app-bar-nav-icon @click.stop="this.$store.state.drawer = !this.$store.state.drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Our Tasks</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>