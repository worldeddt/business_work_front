import '@babel/polyfill'
import Vue from 'vue'
import router from './router/router'
import './plugins/vuetify'
import Vuex from 'vuex';
import axios from 'axios';
import App from './App.vue';
// import store from './store/store';
import vuetify from './plugins/vuetify'

Vue.prototype.axios = axios;
Vue.use(Vuex);
Vue.config.productionTip = false

export const storage = {
  async fetch() {
    // let param = new URLSearchParams();
    // param.append('projectId', '2');

    await axios.post('http://localhost:8090/project/allTemplate')
    .then((response) => {
      if (response.data) {
        const returnValue = response.data;
        
      if (returnValue.commonResponse && returnValue.commonResponse.result === 1) {
        returnValue.projectList;
        return returnValue.projectList;
      }
      } 
    })
    .catch(function (error) {
      console.error(error);
    });
  }
 }

const store = new Vuex.Store({
  state: {
    allProjects: {}
  },
  getters : {
    getProjectList(state) {
      return state.allProjects;
    }
  },
  mutations: {
    allProjectFetch() {
      console.log('commit');
      return storage.fetch();
    }, 
    fetchProject(state, fetchData) { 
      if (fetchData.data) {
        const returnValue = fetchData.data;  
        if (returnValue.commonResponse && returnValue.commonResponse.result === 1) {
          state.allProjects = returnValue.projectList;
        }
      }
    }
  },
  actions : {
      async delayAllProjectFetch(context) {
        return await axios.post('http://localhost:8090/project/allTemplate')
        .then(response => {
          console.log(response);
          context.commit("fetchProject", response);
        });
    }
  }
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
