import Vue from 'vue';
import Router from 'vue-router';
import MainView from '@/view/MainView.vue'

Vue.use(Router);

const project = r => require.ensure([], () => r(require('@/view/Project')), 'project');

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },{
    name: 'project',
    path: '/project/:projectId',
    component: project
  }
];

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})