import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Upload from '@/pages/Upload/Upload.vue'
import TOU from '@/pages/TOU/TOU.vue'
import Signup from '@/pages/Signup/Signup.vue'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/upload',
			name: 'upload',
			component: Upload
		},
		{
			path: '/tou',
			name: 'tou',
			component: TOU
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup
		}
	]
})