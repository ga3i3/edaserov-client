import router from '../router/'
import store from '../store/'
import axios from 'axios'

const loadParams = {
	install(Vue, options) {
		Vue.mixin({
			async beforeCreated() {
				await axios.get(`${process.env.VUE_APP_MAIN_URL}/params`).then(res => {
					if (res.status == 200) store.state.params = res.data.doc;
				}, err => {
					console.log(err);
				})
			},
		});
	}
};

export default loadParams;
