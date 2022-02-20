import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import getUser from './plugins/user'

import './assets/styles.scss'
// import './assets/styles.desktop.scss'

// import VueCarousel from 'vue-carousel';
// Vue.use(VueCarousel);

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(VueTheMask)
Vue.use(getUser)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
