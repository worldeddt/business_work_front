import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/view/Main.vue'

Vue.use(Router);

const project = r => require.ensure([], () => r(require('@/view/Project')), 'project');

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },{
    name: 'project',
    path: '/project',
    component: project
  }
];

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})