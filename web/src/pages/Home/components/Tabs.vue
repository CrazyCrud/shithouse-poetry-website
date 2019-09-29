<template>
	<section>
		<b-tabs position="is-centered" class="block" @change="onTabChanged">
			<b-tab-item v-for="tab in this.tabs" :label="tab.label"></b-tab-item>
		</b-tabs>
	</section>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		name: "Tab",
		data() {
			return {}
		},
		computed: {
			...mapGetters([
				'tabs',
			])
		},
		methods: {
			...mapActions([
				'setActiveTab'
			]),
			onTabChanged: function (number) {
				this.setActiveTab({
					number: number
				})
			}
		}
	}
</script>

<style lang="scss">

</style>