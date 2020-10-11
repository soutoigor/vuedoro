import Vue from 'vue'
import Fragment from 'vue-fragment'
import App from './App'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Fragment.Plugin)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
