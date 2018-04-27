// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './interceptor'
import elementui from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import avatar from 'vue-avatar'

Vue.config.productionTip = false
Vue.use(avatar)
Vue.use(elementui);
Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
