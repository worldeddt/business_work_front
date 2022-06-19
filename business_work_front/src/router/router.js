import Vue from 'vue';
import Router from 'vue-router';
import Home from '../view/Home.vue'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
];

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})