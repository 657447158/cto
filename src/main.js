import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import axios from 'axios'
import './components'
import './utils/scale_750'
import './assets/styles/layout.scss'
// const VConsole = require('./utils/vconsole')

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  if (to.name === 'index' && to.query.token) {
    axios({
      method: 'post',
      url: '/app/index/',
      params: {
        method: '/wallet/switchTokenForOtc',
        mediaType: 'h5',
        token: to.query.token,
        sign: '',
        hasToken: '1'
      }
    }).then(res => {
        if (res.data.code == '1') {
            localStorage.setItem("otctoken", res.data.data)
            next()
        }
    }).catch(err =>{
        console.log('fail' + err)
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
