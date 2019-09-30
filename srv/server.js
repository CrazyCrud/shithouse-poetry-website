'use strict';

import express from 'express';

import {images} from './src/data.js';

const PORT = 8083;
const HOST = '0.0.0.0';

const app = express();

app.get('/api', (req, res) => {
	res.send('Hello API\n');
});

app.get('/images', (req, res) => {
	res.send(images);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);