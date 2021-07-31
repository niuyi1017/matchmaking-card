import Vue from 'vue'
import App from './App'

import home from './pages/home/home.vue'
Vue.component('home',home)

import order from './pages/order/order.vue'
Vue.component('order',order)

import my from './pages/my/my.vue'
Vue.component('my',my)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import Store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.$store = Store

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()

 



