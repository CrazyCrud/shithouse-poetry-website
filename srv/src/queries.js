import {dbConfig} from './config'
import {Client, Pool} from 'pg';


const getEntries = (callback) => {
	const client = new Client(dbConfig);
	client.connect();

	const query = {
		text: 'SELECT * FROM entry ORDER BY date ASC',
	};

	client.query(query, (error, results) => {
		client.end();

		if (error) {
			throw error;
		}
		callback(results);
	});
};

const addEntry = (payload, callback) => {
	const client = new Client(dbConfig);
	client.connect();

	const query = {
		text: 'INSERT INTO entry(title, sex, date, userid, typeid) VALUES($1, $2, $3, $4, $5) RETURNING *',
		values: [payload.title, payload.sex, payload.date, payload.userID, payload.typeID]
	};

	client.query(query, (error, results) => {
		client.end();

		if (error) {
			throw error;
		}
		callback(results);
	});
};

export {
	addEntry,
	getEntries
};