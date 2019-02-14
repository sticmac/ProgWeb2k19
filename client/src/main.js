import Vue from 'vue'
import router from './services/router.js'
import App from './App.vue'

import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(Buefy, { defaultIconPack: 'fa' })

// import '@fortawesome/fontawesome-free'

import Authentification from './services/authentification.js'

Vue.prototype.$authentification = Authentification;

new Vue({
  router: router,
  render: h => h(App),
  
}).$mount('#app')
