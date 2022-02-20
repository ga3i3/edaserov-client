import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		url: process.env.VUE_APP_MAIN_URL + "/uploads/",
		cart: [],
		cat: 'Все блюды',
		// products: [
		// 	{
		// 		id: 1,
		// 		name: "Ролл с овощами и зеленым луком",
		// 		image:
		// 			"https://cms.svoya-kompaniya.ru/images/site_large/f6a/c57/roll-s-ovoshhami-i-zelenym-lukom.jpg",
		// 		weight: 70,
		// 		description:
		// 			"рис, огурец, томат, перец болгарский, зеленый лук, соус спайси, майонез, нори Белки: 2.8 гр., жиры: 3.1 гр., углеводы: 24.5 гр. / 142 кКал",
		// 		options: ["Опция 1 Ролл", "Опция 2 Ролл", "Опция 3 Ролл"],
		// 		cat: "Роллы",
		// 		price: 85,
		// 	},
		// 	{
		// 		id: 2,
		// 		name: "Салат блинный с ветчиной",
		// 		image:
		// 			"https://cms.svoya-kompaniya.ru/images/site_large/445/076/blinnyi-s-vetchinoi.jpg",
		// 		weight: 150,
		// 		description:
		// 			"ветчина, блины, томаты, огурцы, майонез, помидорки черри Белки: 6 гр., жиры: 8.8 гр., углеводы: 9.2 гр. / 141 кКал",
		// 		options: ["Опция 1 Салат", "Опция 2 Салат", "Опция 3 Салат"],
		// 		cat: "Салат",
		// 		price: 100,
		// 	},

		// 	{
		// 		id: 3,
		// 		name: "Салат Греческий лайт",
		// 		image:
		// 			"https://cms.svoya-kompaniya.ru/images/site_large/75a/ca4/greceskii-lait.jpg",
		// 		weight: 150,
		// 		description:
		// 			"огурцы, томаты, перец болгарский, капуста пекинская, маслины, сыр фета, соус песто, зелень Белки: 4.1 гр., жиры: 8.5 гр., углеводы: 4.5 гр. / 113 кКал",
		// 		options: ["Опция 1 лайт", "Опция 2 лайт", "Опция 3 лайт"],
		// 		cat: "Салат",
		// 		price: 110,
		// 	},
		// ],
		products: [],
		currentRoute: '',
		value: 0,
		quantityToggle: [],
		removeAllProducts: false,
		menu_drawer: false,
		user: {}
	},
	mutations: {

	},
	actions: {
	},
	modules: {
	}
})
