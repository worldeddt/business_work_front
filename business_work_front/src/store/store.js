import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
Vue.prototype.axios = axios;

const store = new Vuex.Store({
  state: {
    allProjects:[]
  },
  getters : {
    getProjectList(state) {
      return state.allProjects;
    }
  },
  mutations: {

  }
});

export const storage = {
  async fetch() {
    console.group("fetch log");
    // let param = new URLSearchParams();
    // param.append('projectId', '2');

    await axios.post('http://localhost:8090/project/allTemplate')
    .then((response) => {
      if (response.data) {
        const returnValue = response.data;
        
      if (returnValue.commonResponse && returnValue.commonResponse.result === 1) {
        store.state.allProjects = returnValue.projectList
      }
      } 
    })
    .catch(function (error) {
      console.error(error);
    });
    console.groupEnd();
	}
 }

 storage.fetch();
