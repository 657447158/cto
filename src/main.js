import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import './utils/scale_750'
import './assets/styles/layout.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
