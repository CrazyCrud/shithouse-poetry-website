'use strict';

import express from 'express';
import {API} from './src/api';

const PORT = 8083;
const HOST = '0.0.0.0';

const app = express();
const api = new API();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => {
	res.send('Hello Latrinalia!\n');
});

app.get('/api', (req, res) => {
	res.send('This is the API!\n');
});

app.post('/api/upload', (req, res) => {
	const payload = req.body;
	res.send('Upload completed');
	/*
	api.handleUpload(payload).then((entryID) => {
		res.send({
			status: 200,
			msg: 'ok'
		});
	}).catch((err) => {
		res.send({
			status: 400,
			msg: 'error'
		});
	});
	 */
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);