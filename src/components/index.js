import Vue from 'vue'
import Modal from './modal/modal.vue'
import ScrollLoad from './scrollLoad/scrollLoad.vue'
import CheckPhoto from './checkPhoto/checkPhoto.vue'

const components = [
    Modal,
    ScrollLoad,
    CheckPhoto
]

// 将所有组件保存到vue上后面在页面上可以直接用组件name调用
for (let i = 0; i < components.length; i++) {
    Vue.component(components[i].name, components[i])
}
  