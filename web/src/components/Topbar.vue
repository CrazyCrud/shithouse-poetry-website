<template>
	<b-navbar fixed-top>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				Home
			</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item tag="router-link" :to="{ path: '/upload' }">
				<a class="button is-primary nav-item nav-item--upload">
					<strong>Upload</strong>
				</a>
			</b-navbar-item>
			<b-navbar-item href="#">
				<b-field>
					<b-input placeholder="Search..."
									 type="search"
									 icon="magnify">
					</b-input>
				</b-field>
			</b-navbar-item>
			<b-navbar-item tag="router-link" :to="{ path: '/tou' }">
				Terms of Use
			</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<b-navbar-item tag="router-link" :to="{ path: '/signup' }">
						<a class="button is-primary">
							<strong>Sign up</strong>
						</a>
					</b-navbar-item>
					<a class="button is-light" @click="isLoginFormActive = true">
						Log in
					</a>
					<b-modal :active.sync="isLoginFormActive" has-modal-card trap-focus custom-class="c-login modal--login">
						<login v-bind="loginFormProps"></login>
					</b-modal>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
	import Login from '@/components/Login';

	export default {
		name: "Topbar",
		components: {
			Login
		},
		data() {
			return {
				isLoginFormActive: false,
				loginFormProps: {
					email: '',
					password: ''
				}
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	.nav-item {
		&--upload {
			color: white;
			text-decoration: none;
		}
	}

	.c-login {
		width: 100%;
	}
</style>