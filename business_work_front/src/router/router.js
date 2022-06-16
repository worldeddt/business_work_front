import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const main = r => require.ensure([], () => r(require('@/view/main/Main')), 'main');
const login = r => require.ensure([], () => r(require('@/view/login/Login')), 'login');


const routes = [
  {
    path: '/',
    component: login
  },
  {
      path: '/main',
      component : main
  }
];


export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})