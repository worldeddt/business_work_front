<template>
<v-app id="inspire">
  <v-navigation-drawer
        v-model="drawer"
        fixed
        app
    >
    <v-spacer>
      <div>
        <v-btn elevation="2" x-small block :id="plus" @click="plusProject()"></v-btn>
      </div>
    </v-spacer>
      <v-list v-for="project in this.$store.getters.getProjectList" :key="project.index" dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>fas fa-list</v-icon>
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
    <v-toolbar
color="deep-purple accent-4"
    dark
  elevation="5">
      <v-icon @click.stop="drawer = !drawer">fas fa-list</v-icon>
      <v-toolbar-title>
        
      </v-toolbar-title>
      <v-spacer>
        <v-icon large color="white darken-2">
        mdi-folder-tree
        </v-icon>
      </v-spacer>
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
      if(this.$route.path !== `/project/${projectIndex}`) {
        this.$router.push({path:`/project/${projectIndex}`})
      }
    },
    plusProject() {
      const store = this.$store;
  
      const promise = new Promise(function (resolve) {
      store.dispatch("additionalProject");
        resolve("success");
      });
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
