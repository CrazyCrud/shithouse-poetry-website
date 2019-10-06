import {Client} from 'pg';
import {config} from './config'
import { Pool } from 'pg';

const pool = new Pool(config);

const query = function (text, params, callback) {
	const start = Date.now();

	return pool.query(text, params, (err, res) => {
		const duration = Date.now() - start;
		console.log('Executed query', { text, duration, rows: res.rowCount });
		callback(err, res);
	})
};

/*
class Database {
	constructor() {
		this.client = new Client(config);
	}

	connect() {
		this.client.connect().then(() => {
			console.log("Connected to database");
		}).catch((error) => {
			console.log("Error while connection", error);
		});
	}

	addEntry(payload) {
		console.log('Add new entry with payload', payload);

		const text = 'INSERT INTO entry(title, sex, date, userid, typeid) VALUES($1, $2, $3, $4, $5) RETURNING *';
		const values = [payload.title, payload.sex, payload.date, payload.userID, payload.typeID];

		return new Promise((resolve, reject) => {
			this.client
				.query(text, values)
				.then(res => {
					console.log(res.rows[0]);
					resolve(res.rows[0].id);
				})
				.catch(e => {
					console.error(e.stack);
					reject(e.stack);
				});
		}).catch(() => {
			console.log();
		});
	}

	getEntries() {

	}

	close() {
		this.client.end();
	}
}
*/

export {
	query
};