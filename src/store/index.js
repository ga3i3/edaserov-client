import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		url: process.env.VUE_APP_MAIN_URL + "/uploads/",
		cart: [],
		cat: 'Все блюды',
		products: [],
		currentRoute: '',
		value: 0,
		quantityToggle: [],
		removeAllProducts: false,
		menu_drawer: false,
		user: {},
		params: {}
	},
	mutations: {
		params(state) {
			axios.get(`${process.env.VUE_APP_MAIN_URL}/params`).then(res => {
				if (res.status == 200) state.params = res.data.doc;
			}, err => {
				console.log(err);
			})
		}
	},
	actions: {
	},
	modules: {
	}
})
