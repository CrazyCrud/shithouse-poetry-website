<template>
	<div id="app">
		<topbar></topbar>
    <router-view></router-view>
	</div>
</template>

<script>
	import Topbar from '@/components/Topbar'

	export default {
		name: 'App',
		components: {
			Topbar
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
