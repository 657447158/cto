import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import './components'
import './utils/scale_750'
import './assets/styles/layout.scss'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
