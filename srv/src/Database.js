import {Client} from 'pg';
import {config} from './config'

class Database {
	constructor() {
		this.client = new Client(config);
	}

	connect() {
		this.client.connect();
	}

	addEntry(payload) {
		console.log('Add new entry', payload);
	}

	getEntries() {

	}

	query() {
		this.client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
			console.log(err ? err.stack : res.rows[0].message)
		});
	}

	close() {
		this.client.end()
	}
}

export {
	Database
};