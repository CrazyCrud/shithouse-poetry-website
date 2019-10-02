'use strict';

import express from 'express';
import {API} from './src/api';

const PORT = 8083;
const HOST = '0.0.0.0';

const app = express();
const api = new API();

app.get('/api', (req, res) => {
	res.send('Hello API\n');
});

app.get('/images', (req, res) => {
	const response = api.handleUpload(req);
	res.send(response);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);