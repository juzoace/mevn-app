import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false

// load the token from the localStorage
Vue.prototype.$http = axios;
const token = localStorage.getItem("token");

// If there is any token then we wil simply append default axios authorization headers
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
