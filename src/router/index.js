import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
			title: 'Профиль'
		}
	},
	{
		path: '/checkout',
		name: 'Checkout',
		component: () => import('../views/Checkout.vue'),
		meta: {
			title: 'Оформление заказа'
		}
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
