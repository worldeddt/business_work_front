import Vue from 'vue'
import router from './router/router'
import App from './App.vue'
import store from './store/store';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
