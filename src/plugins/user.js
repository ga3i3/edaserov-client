import router from '../router/'
import store from '../store/'
import axios from 'axios'

const getUser = {
	install(Vue, options) {
		Vue.mixin({
			beforeCreate() {
				const token = localStorage.getItem('token');

				if (token == null && router.currentRoute.path.includes('account')) {
					router.push('/profile')
				} else if (token != null && router.currentRoute.path == '/profile') {
					router.push('/account')
				}
			},
			created() {
				const token = localStorage.getItem('token');

				if (token != null && router.currentRoute.path.includes('account')) {
					axios.get(`${process.env.VUE_APP_MAIN_URL}/user/grab`, {
						headers: {
							token: localStorage.getItem('token')
						}
					}).then(res => {
						if (res.status == 200) {
							store.state.user = res.data;
						}
					}, err => {
						console.log(err);
						router.push('/profile')
					})
				}

				if (token != null && router.currentRoute.path == '/checkout') {
					axios.get(`${process.env.VUE_APP_MAIN_URL}/user/grab`, {
						headers: {
							token: localStorage.getItem('token')
						}
					}).then(res => {
						if (res.status == 200) {
							store.state.user = res.data;
						}
					}, err => {
						console.log(err);
					})
				}
			}
		});
	}
};

export default getUser;
