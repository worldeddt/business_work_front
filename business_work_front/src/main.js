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

const store = new Vuex.Store({
  state: {
    allProjects : {},
    allData : {}
  },
  getters : {
    getProjectList(state) {
      return state.allProjects;
    },
    getAllData(state) {
      return state.allData;
    }
  },
  mutations: {
    fetchProject(state, fetchData) { 
      if (fetchData.data) {
        const returnValue = fetchData.data;  
        if (returnValue.commonResponse && returnValue.commonResponse.result === 1) {
          state.allProjects = returnValue.projectList;
        }
      }
    },
    fetchAllData(state, fetchData) {
      if (fetchData.data) {
        const returnValue = fetchData.data;  
        if (returnValue.commonResponse && returnValue.commonResponse.result === 1) {
          state.allData = returnValue;
          console.log(state.allData);
        }
      }
    }
  },
  actions : {
    async delayAllProjectFetch(context) {
      await axios.post('http://localhost:8090/project/allTemplate')
      .then(response => {
        context.commit("fetchProject", response);
      });
    },
    async delayAllDataFetch(context, parameter) {
      if (parameter && parameter.projectId){
        let param = new URLSearchParams();
        param.append('projectId', parameter.projectId);
        await axios.post('http://localhost:8090/project/template', param)
        .then(response => {
          context.commit("fetchAllData", response);
        });
      }
    }, 
    async moveToTask(taskId) {
      if (!taskId) {
        alert('테스크 정보를 찾을 수 없습니다.');
        return;
      }


      let param = new URLSearchParams();
      param.append('index', parameter.projectId);
      param.append('title', parameter.projectId);
      param.append('description', parameter.projectId);
      param.append('sectionId', parameter.projectId);
      param.append('status', 'TODO');

      await axios.post('http://localhost:8090/task/update', param)
      .then(response =>  {
        
      })
    }
  }
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
