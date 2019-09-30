import {Client} from 'pg';
import {config} from './config'

class Database {
	constructor() {
		this.client = new Client(config);
		this.client.connect();
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