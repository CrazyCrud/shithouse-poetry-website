<template>
	<section class="section section--about">
		<div class="container">
			<h1>Upload a New Image</h1>
			<b-field class="file">
				<b-upload v-model="file">
					<a class="button is-primary">
						<b-icon icon="upload"></b-icon>
						<span>Click to upload</span>
					</a>
				</b-upload>
				<span class="file-name" v-if="file">
            {{ file.name }}
        </span>
			</b-field>
			<b-field label="Title">
				<b-input v-model="title"></b-input>
			</b-field>
			<b-field>
				<b-radio-button v-model="gender"
												native-value="Men"
												type="is-light">
					<b-icon icon="men"></b-icon>
					<span>Men</span>
				</b-radio-button>
				<b-radio-button v-model="gender"
												native-value="Women"
												type="is-light">
					<b-icon icon="women"></b-icon>
					<span>Women</span>
				</b-radio-button>
				<b-radio-button v-model="gender"
												native-value="Other"
												type="is-light">
					<b-icon icon="check"></b-icon>
					<span>Other</span>
				</b-radio-button>
			</b-field>
			<b-field label="Transcription">
				<b-input v-model="transcription"></b-input>
			</b-field>
			<b-field>
				<b-button @click="uploadImage">Click Me</b-button>
			</b-field>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'Upload',
		data() {
			return {
				file: null,
				title: '',
				gender: '',
				transcription: ''
			}
		},
		methods: {
			uploadImage: function () {

			}
		}
	}
</script>

<style lang="scss">

</style>
