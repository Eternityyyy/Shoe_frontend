import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import Message from './components/common/message/index.js'

Vue.prototype.$my_message = Message.install;

Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
  router,
  store,
  // cookies,
}).$mount('#app')
