import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import getUser from './plugins/user'
import loadParams from './plugins/params'
import currency from './plugins/currency'

import './assets/styles.scss'
// import './assets/styles.desktop.scss'

// import VueCarousel from 'vue-carousel';
// Vue.use(VueCarousel);

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$currency = currency;

Vue.use(VueTheMask)
Vue.use(getUser)
// Vue.use(loadParams)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
