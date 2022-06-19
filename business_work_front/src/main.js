import '@babel/polyfill'
import Vue from 'vue'
import router from './router/router'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
