import {addEntry} from './queries';

const handleUpload = (payload, callback) => {
	const entry = {
		title: payload.hasOwnProperty('title') ? payload.title : null,
		sex: payload.hasOwnProperty('sex') ? payload.sex : null,
		date: new Date(),
		userID: payload.hasOwnProperty('userID') ? payload.userID : null,
		typeID: payload.hasOwnProperty('typeID') ? payload.typeID : null,
	};

	console.log("Entry to add", entry);

	addEntry(entry, (entryID) => {
		console.log("Entry added!");

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

		callback(entryID);
	});
};

export {
	handleUpload
};