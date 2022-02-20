import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'
import store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/cart',
		name: 'Cart',
		component: () => import('../views/Cart.vue'),

	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
		meta: {
			title: 'Профиль',
		}
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import('../views/Account.vue'),
		meta: {
			title: 'Кабинет',
			requiresAuth: true
		}
	},
	{
		path: '/checkout',
		name: 'Checkout',
		component: () => import('../views/Checkout.vue'),
		meta: {
			title: 'Оформление заказа',
			requiresAuth: true
		}
	},
	{
		path: '/success/:id',
		name: 'Success',
		component: () => import('../views/Success.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	const isAuthenticated = localStorage.getItem('token') !== null

	if (requiresAuth && !isAuthenticated) {
		next()
	} else {
		next()
	}
	if ((to.path == '/account' || to.path == '/checkout') && isAuthenticated) {
		axios.get(`${process.env.VUE_APP_MAIN_URL}/user/grab`, {
			headers: {
				token: localStorage.getItem('token')
			}
		}).then(res => {
			if (res.status == 200) {
				store.state.user = res.data;
			}
		}, err => {
		})
	}



})

export default router
