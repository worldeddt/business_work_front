import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Login from './components/login/Login.vue';
import Main from './components/main/Main.vue';

Vue.config.productionTip = false

const routes = [
  { path: '/main', component:  Main},
  { path: '/login', component : Login}
]

const vueRouter = new VueRouter({
  routes: routes
});

new Vue({
  render: h => h(App),
  router : vueRouter
}).$mount('#app')
