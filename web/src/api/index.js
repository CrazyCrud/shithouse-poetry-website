import axios from 'axios';

const SERVER = 'http://localhost:8083';

const uploadImage = function (payload) {
	const data = {
		title: payload.title,
		sex: payload.sex,
		transcription: payload.transcription,
		image: payload.image
	};

	axios.post(`${SERVER}/api/upload`, data)
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