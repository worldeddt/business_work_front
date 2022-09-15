import '@babel/polyfill'
import Vue from 'vue'
import router from './router/router'
import './plugins/vuetify'
import Vuex from 'vuex';
import axios from 'axios';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import VModal from 'vue-js-modal'
import ProjectRegister from "./view/modal/ProjectRegister";

Vue.prototype.axios = axios;
Vue.use(Vuex);
Vue.use(VModal,{ 
    dynamicDefaults : {
      height: '30%'
    }}
  );
Vue.config.productionTip = false

export const store = new Vuex.Store({
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
    },
    openProjectRegister(state, _modal) {
      _modal.show(ProjectRegister,{
        draggable : false 
      });
      console.log(_modal);
    },
    closeProjectRegister(state, _modal) {
      console.log(_modal);
      _modal.hide();
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
    async additionalProject(context, param) {
      console.log(param);
      console.log(this.$modal);
      this.$modal.hide(ProjectRegister);
      return;

      // await axios.post('http://localhost:8090/project/register', param)
      // .then(response => {
      //   if (!response || !response.data) {
      //     alert("결과를 확인할 수 없습니다.");
      //     return;
      //   }

      //   if (response.data.result !== 1) {
      //     alert(`오류가 발생하였습니다. : ${response.data.message}`)
      //     return;
      //   }

      //   console.log(context);

      //   this.$modal.hide(ProjectRegister);

      //   context.dispatch("delayAllProjectFetch")
      // });
    }, 
    async additionalTask(context) {
      console.log(context);
      await axios.post('http://localhost:8090/task/register')
      .then(response => {
        console.log(response);
      });
    }, 
    async additionalSection(context) {
      console.log(context);
      await axios.post('http://localhost:8090/section/register')
      .then(response => {
        console.log(response);
      });
    }, 
    async removeSection(context) {
      console.log(context);
      await axios.post('http://localhost:8090/section/delete')
      .then(response => {
        console.log(response);
      });
    }, 
    async removeTask(context) {
      console.log(context);
      await axios.post('http://localhost:8090/task/delete')
      .then(response => {
        console.log(response);
      });
    }, 
    async updateProject(context, parameter) {
      await axios.post('http://localhost:8090/project/update', parameter)
      .then(response => {
        console.log(response);
      });
    },
    async removeProject(context, parameter) {
      if (!parameter || !parameter.projectId) alert("필수값이 누락되었습니다.")

      let param = new URLSearchParams();
      param.append('projectId', parameter.projectId);
      await axios.post('http://localhost:8090/project/delete', param)
      .then(response => {
        console.log(response);
        if (response && response.data && response.data.result) {

          if (Number(response.data.result) !== 1) {
            alert(`삭제에 실패하였습니다. 결과 : ${response.data.message}`);
            return;
          }

          alert("삭제하였습니다.");
          
        } else {
          alert("수정에 실패하였습니다.");
          return;
        }
      });
    }, 
    async moveToTask(context, parameter) {
      await axios.post('http://localhost:8090/task/updateSection', parameter)
      .then(response =>  {
        if (response && response.data && response.data.result) {

          if (Number(response.data.result) !== 1) {
            alert(`수정에 실패하였습니다. 결과 : ${response.data.message}`);
            return;
          }
          
        } else {
          alert("수정에 실패하였습니다.");
          return;
        }
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
