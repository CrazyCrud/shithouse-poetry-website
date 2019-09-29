<template>
	<b-navbar fixed-top>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				Home
			</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item href="#">
				<a class="button is-primary">
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
			<b-navbar-item href="#">
				Terms of Use
			</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<a class="button is-primary">
						<strong>Sign up</strong>
					</a>
					<a class="button is-light">
						Log in
					</a>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
	export default {
		name: "Topbar"
	}
</script>

<style lang="scss">

</style>