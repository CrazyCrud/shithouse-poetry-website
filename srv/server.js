'use strict';

const express = require('express');

// Constants
const PORT = 8083;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello world\n');
});

app.get('/api', (req, res) => {
	res.send('Hello API\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);