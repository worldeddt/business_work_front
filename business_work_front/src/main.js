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
    async moveToTask(parameter) {
      console.log(parameter)
      console.log();

      if (!parameter.index) {
        alert('테스크 정보를 찾을 수 없습니다.');
        return;
      }

      if (!parameter) return;

      let param = new URLSearchParams();

      for (let section of this.state.allData.sectionList) {
        if (section.index === parameter.sectionId) {
          for (let task of this.state.allData.sectionList.taskList) {
            if (task.index === parameter.index) {
              param.append('index', task.index);
              param.append('title', task.title);
              param.append('description', task.description);
              param.append('sectionId', section.index);
              param.append('status', task.status);
            }
          }
        }
      }

      
      

      await axios.post('http://localhost:8090/task/update', param)
      .then(response =>  {
        console.log(response)
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
