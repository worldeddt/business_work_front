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
import SectionRegister from "./view/modal/SectionRegister";
import TaskRegister from "./view/modal/TaskRegister";
import TaskModify from "./view/modal/TaskModify";
import SectionModify from "./view/modal/SectionModify";
import Swal from 'sweetalert2';

export const TYPE_OF_SUCCESS = "success";
export const TYPE_OF_FAIL = "fail";

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
    allData : {},
    currentProjectIndex : null,
    currentSelectedSection : null,
    taskIndex : null,
    currentSelectedTask : null
  },
  getters : {
    getProjectList(state) {
      return state.allProjects;
    },
    getAllData(state) {
      return state.allData;
    },
    getCurrentProjectIndex(state) {
      return state.currentProjectIndex;
    },
    getCurrentSelectedTask(state) {
      return state.currentSelectedTask;
    },
    getCurrentSelectedSection(state) {
      return state.currentSelectedSection;
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
    openProjectRegister(state, modal) {
      modal.show(ProjectRegister,{
        draggable : false 
      });
    },
    openSectionRegister(state, modal) {
      modal.show(SectionRegister,{
        draggable : false 
      });
    },
    openTaskRegister(state, modal) {
      modal.show(TaskRegister,{
        draggable : false 
      });
    },
    openTaskModify(state, _param) {
      /**
       description
      index
      lastModifyDate
      registerDate
      section
      taskStatusType
      title
       */
      state.currentSelectedTask = _param.task;

      _param.modal.show(TaskModify, {
        draggable : false
      });
    },
    openSectionModify(state, _param) {
      
    
      console.log(_param.section);
      state.currentSelectedSection = _param.section;

      _param.modal.show(SectionModify, {
        draggable : false
      });
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
          context.state.currentProjectIndex = parameter.projectId;
          context.commit("fetchAllData", response);
        });
      }
    },
    async additionalProject(context, param) {
      await axios.post('http://localhost:8090/project/register', param)
      .then(response => {
        if (!response || !response.data || !response.data.result) {
          if (response.data.message) alert(`등록에 실패하였습니다. 결과 : ${response.data.message}`);
          else alert(`등록에 실패하였습니다.`);

          return;
        }

        alert('등록 성공');
        window.location.reload();

      });
    }, 
    async removeProject(context, parameter) {
      if (!parameter || !parameter.projectId) alert("필수값이 누락되었습니다.")

      let param = new URLSearchParams();
      param.append('projectId', parameter.projectId);
      await axios.post('http://localhost:8090/project/delete', param)
      .then(response => {
        if (response && response.data && response.data.result) {

          if (Number(response.data.result) !== 1) {
            alert(`삭제에 실패하였습니다. 결과 : ${response.data.message}`);
            return;
          }

          alert("삭제하였습니다.");
          window.location.reload();
        
        } else {
          alert("수정에 실패하였습니다.");
          return;
        }
      });
    },
    async additionalTask(context, param) {
      await axios.post('http://localhost:8090/task/register', param)
      .then(response => {
        if (!response || !response.data || !response.data.result) {
          if (response.data.message) alert(`등록에 실패하였습니다. 결과 : ${response.data.message}`);
          else alert(`등록에 실패하였습니다.`);

          return;
        }

        alert('등록 성공');
        window.location.reload();
      });
    },
    async modifyTask(context, param) {
      await axios.post('http://localhost:8090/task/update', param)
      .then(response => {
        if (!response || !response.data || !response.data.result) {
          if (response.data.message) alert(`등록에 실패하였습니다. 결과 : ${response.data.message}`);
          else alert(`등록에 실패하였습니다.`);

          return;
        }

        alert('수정 성공');
        window.location.reload();
      });
    },  
    async modifySection(context, param) {
      console.log(param);
      await axios.post('http://localhost:8090/section/update', param)
      .then(response => {
        if (!response || !response.data || !response.data.result) {
          if (response.data.message) alert(`등록에 실패하였습니다. 결과 : ${response.data.message}`);
          else alert(`등록에 실패하였습니다.`);

          return;
        }

        alert('수정 성공');
        window.location.reload();
      });
    },
    async additionalSection(context, param) {
      await axios.post('http://localhost:8090/section/register', param)
      .then(response => {

        if (!response || !response.data || !response.data.result) {
          if (response.data.message) alert(`등록에 실패하였습니다. 결과 : ${response.data.message}`);
          else alert(`등록에 실패하였습니다.`);

          return;
        } else {
          alert('등록 성공');
        }

        window.location.reload();
      });
    }, 
    async removeSection(context, sectionId) {
      let param = new URLSearchParams();
      param.append('taskIndex', sectionId);

      await axios.post('http://localhost:8090/section/delete', param)
      .then(response => {
        if (response && response.data && response.data.result) {

          if (Number(response.data.result) !== 1) {
            alert(`삭제에 실패하였습니다. 결과 : ${response.data.message}`);
            return;
          }

          Swal.fire({
            text: '삭제 완료',
            icon:'info',
            confirmButtonText: '확인',
          }).then((_result) => {
            if (_result.isConfirmed) window.location.reload();
          })
          
        } else {
          alert("삭제에 실패하였습니다.");
          return;
        }
      });
    }, 
    async removeTask(context, taskId) {
      let param = new URLSearchParams();
      param.append('taskIndex', taskId);
      
      await axios.post('http://localhost:8090/task/delete', param)
      .then(response =>  {
        if (response && response.data && response.data.result) {

          if (Number(response.data.result) !== 1) {
            alert(`삭제에 실패하였습니다. 결과 : ${response.data.message}`);
            return;
          }

          Swal.fire({
            text: '삭제 완료',
            icon:'info',
            confirmButtonText: '확인',
          }).then((_result) => {
            if (_result.isConfirmed) window.location.reload();
          })
          
        } else {
          alert("삭제에 실패하였습니다.");
          return;
        }
      })
      .catch(reject => {
        console.log(reject);
        alert("삭제에 실패하였습니다.");
        return;
      })
    }, 
    async updateProject(context, parameter) {
      await axios.post('http://localhost:8090/project/update', parameter)
      .then(response => {
        return response
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
      .catch(reject => {
        console.log(reject);
        alert("수정에 실패하였습니다.");
        return;
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
