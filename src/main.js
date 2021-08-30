import Vue from 'vue'
import App from './App.vue'
import './static/css/index.css'
import Preview from './index'

Vue.use(Preview)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
