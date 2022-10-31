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
            <v-icon>fas fa-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="cursor: pointer" @click="routerProject(`${project.index}`)">{{project.title}}</v-list-item-title>
          </v-list-item-content>
          <v-menu transition="scroll-x-reverse-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="ma-2" v-bind="attrs" v-on="on">fas fa-ellipsis-h</v-icon>
            </template>
            <v-list>
              <v-list-item 
                v-for="n in optionBtn"
                :key="n"
                link
                style="width:10rem;"
                class="text-center"
              >
                <v-list-item-title v-text="n" @click="modifyProject(`${optionBtnEn[n]}`, project.index)"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
      </v-list>
      <v-spacer>
      <div class="col-sm-12 text-center">
        <v-btn
        :disabled="loading"
        class="ma-1"
        width="100%"
        color="black"
        plain
        @click="openProjectRegister">
          <v-icon color="dark">
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </v-spacer>
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
import Swal from 'sweetalert2';

export default {
  data: () => ({
    drawer : false,
    storeData : [],
    loading : false,
    optionBtnEn : {"삭제":"delete", "수정" : "update"},
    optionBtn : ["삭제", "수정"]
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
    deleteProject(projectId) {
      Swal.fire({
        title: '삭제',
        text: '삭제 하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton:true,
        cancelButtonText : '취소'
      }).then((_result) => {
        if (_result.isConfirmed) {
          this.$store.dispatch("removeProject",{projectId});
        }
      });
    },
    updateProject(_projectIndex) {
      for (let project of this.$store.getters.getProjectList) {
        if (Number(project.index) === Number(_projectIndex)) {
          this.$store.commit('openProjectRegister', this.$modal);
        }
      }
    },
    modifyProject(_flag, _projectIndex) {
      if (!_projectIndex) alert("동작을 수행할 수 없습니다.");

      if (_flag === "delete") {
        this.deleteProject(_projectIndex)
      }

      if (_flag === "update") {
        this.updateProject(_projectIndex);
      }
    },
    openProjectRegister() {
      this.$store.commit('openProjectRegister', this.$modal)
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
