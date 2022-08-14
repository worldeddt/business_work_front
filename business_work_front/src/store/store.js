import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
Vue.prototype.axios = axios;

const storage = {
  async fetch() {
    console.group("fetch log");
    // let param = new URLSearchParams();
    // param.append('projectId', '2');

    await axios.post('http://localhost:8090/project/allTemplate')
    .then((response) => {
      if (response.data) {
        const returnValue = response.data;

        console.log(returnValue);
        
        if (returnValue.commonResponse && returnValue.commonResponse.result === 1) 
          return returnValue.projectList;
      } 
    })
    .catch(function (error) {
      console.error(error);
    });
    console.groupEnd();
	}
 }


export const store = new Vuex.Store({
    state: {
      allProjects: storage.fetch() || [],
      drawer : false
    },
    getters : {
      getProjectList(state) {
        return state.allProjects;
      }
    },
    mutations: {

    },
    methods : {

    }
});