import {query} from './Database';

class API {
	constructor() {

	}

	handleUpload(payload) {
		const entry = {
			title: payload.hasOwnProperty('title') ? payload.title : null,
			sex: payload.hasOwnProperty('sex') ? payload.sex : null,
			date: new Date(),
			userID: payload.hasOwnProperty('userID') ? payload.userID : null,
			typeID: payload.hasOwnProperty('typeID') ? payload.typeID : null,
		};

		/*
		return new Promise((resolve, reject) => {
			this.db.addEntry(entry).then((entryID) => {
				// TODO: Upload payload.image to Imgur and receive path
				const path = null;
				const image = {
					path: path,
					entryID: entryID
				};

				// TODO: Add information
				const information = {
					transcription: payload.hasOwnProperty('transcription') ? payload.transcription : null,
					location: payload.hasOwnProperty('location') ? payload.location : null,
					point: payload.hasOwnProperty('point') ? payload.point : null,
					entryID: entryID
				};

				resolve(entryID);
			})
				.catch((err) => {
					reject(err);
				});
		}).catch(() => {
			console.log();
		});
		 */
	}
}

export {
	API
};