import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.js' 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store.js'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(Vuex)

Vue.prototype.$http = axios;

const router = new VueRouter({
	routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
