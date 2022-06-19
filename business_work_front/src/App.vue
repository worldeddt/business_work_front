<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        fixed
        app
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <i class="fas fa-home"></i>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <i class="fas fa-home"></i>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card
        color="grey lighten-4"
        flat
        tile>
    <v-toolbar color="indigo" dark fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Our Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    </v-card>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2022</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    drawer : false
  }),
  props: {
    source: String
  }
};
</script>
