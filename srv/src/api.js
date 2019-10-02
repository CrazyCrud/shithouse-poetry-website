import {Database} from './Database';

class API {
	constructor() {
		this.db = new Database();
		this.db.connect();
	}

	handleUpload(payload) {
		this.db.addEntry(payload);
	}
}

export {
	API
};