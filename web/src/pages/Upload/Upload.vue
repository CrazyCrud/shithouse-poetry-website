<template>
	<section class="section section--about">
		<div class="container">
			<h1>Upload a New Image</h1>
			<div class="c-upload-form">
				<b-field class="file">
					<b-upload v-model="image">
						<a class="button is-primary">
							<b-icon icon="upload"></b-icon>
							<span>Click to upload</span>
						</a>
					</b-upload>
					<span class="file-name" v-if="image">
            {{ image.name }}
        </span>
				</b-field>
				<b-field label="Title">
					<b-input v-model="title"></b-input>
				</b-field>
				<b-field>
					<b-radio-button v-model="sex"
													native-value="Men"
													type="is-light">
						<b-icon icon="men"></b-icon>
						<span>Men</span>
					</b-radio-button>
					<b-radio-button v-model="sex"
													native-value="Women"
													type="is-light">
						<b-icon icon="women"></b-icon>
						<span>Women</span>
					</b-radio-button>
					<b-radio-button v-model="sex"
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
					<b-button @click="uploadImage">Upload</b-button>
				</b-field>
			</div>

		</div>
	</section>
</template>

<script>
	import {uploadImage} from '@/api';

	export default {
		name: 'Upload',
		data() {
			return {
				image: null,
				title: '',
				sex: '',
				transcription: ''
			}
		},
		methods: {
			uploadImage: function () {
				uploadImage({
					title: this.title,
					sex: this.sex,
					transcription: this.transcription,
					image: this.image
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
