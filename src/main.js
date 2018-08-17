/*
入口文件
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import router from './router'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import store from './store'
import Split from './components/Split/Split.vue'

import './filters'
import './mock/mockServer'
import loading from './common/imgs/loading.gif'
//懒加载图片
Vue.use(VueLazyload, {
  loading
})

//全局注册组件
Vue.component(Button.name, Button)
Vue.component('Split',Split)

new Vue({
  el:'#app',
  render:h =>h(App),
  router,
  store,
  Button
})


