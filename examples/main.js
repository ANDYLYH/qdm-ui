import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from 'qdm-timeutils'
// 导入组件库
import qdamaUi from './../src/index.js'
// 注册组件库
Vue.use(qdamaUi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
