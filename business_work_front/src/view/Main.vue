<template>
<v-app id="inspire">
  <v-navigation-drawer
        v-model="drawer"
        fixed
        app
    >
      <v-list v-for="project in this.$store.getters.getProjectList" :key="project.index" dense>
        <v-list-item>
          <v-list-item-action>
            <i class="fa-solid fa-list-check"></i>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="cursor: pointer" @click="routerProject(`${project.index}`)">{{project.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card
        color="grey lighten-4"
        flat
        tile>
    <v-toolbar dark fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Our Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    </v-card>
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <v-footer dark app>
      <span class="white--text">&copy; 2022</span>
    </v-footer>
    </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer : false,
    storeData : []
  }),
  props: {
    source: String
  },
  methods : {
    routerProject(projectIndex) {
      console.log(projectIndex);
      if(this.$route.path !== `/project/${projectIndex}`) {
        this.$router.push({path:`/project/${projectIndex}`})
      }
    }
  },
  watch : { 
  },
  created() {
    this.$store.dispatch("delayAllProjectFetch");
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
