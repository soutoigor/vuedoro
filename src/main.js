import Vue from 'vue'
import App from './App'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
