import Vue from 'vue'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import '@/styles/index.css' // 全局css
import '@/permission'
import '@/assets/icons'

import App from './App'
import router from './router'
import store from './store'
import AxiosPlugin from './utils/request'

Vue.use(ElementUI, {
  locale
});
Vue.use(AxiosPlugin);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
