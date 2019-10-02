import axios from 'axios';

const SERVER = 'localhost:8083';

const uploadImage = function (payload) {
	axios.post(`${SERVER}/upload`, {
		title: payload.title,
		gender: payload.gender,
		transcription: payload.transcription,
		image: payload.image
	})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

export {
	uploadImage
};