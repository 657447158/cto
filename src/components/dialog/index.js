/*
* @Author: hejianping
* @Date:   2018-05-17 11:08:25
* @Last Modified by:   hejianping
* @Last Modified time: 2018-05-31 11:19:47
*/

import Vue from 'vue'
import DialogVue from './dialog.vue'

let instance
// 默认配置
const defaultParam = {
  show: true,
  title: '',
  content: '',
  comfirmValue: '确认',
  cancelValue: '取消',
  align: 'center',
  comfirmFn: null,
  cancelFn: null,
  // content里面的点击事件
  contentFn: null
}

const initInstrance = () => {
  const DialogConstruotcr = Vue.extend(DialogVue)
  instance = new DialogConstruotcr({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const Dialog = (options = {}) => {
  options = {...defaultParam, ...options}
  if (!instance) {
    initInstrance()
  }
  clearTimeout(instance.timmer)
  Object.assign(instance, {...options})
  return instance
}
Dialog.close = () => {
  instance.show = false
}
export default Dialog
