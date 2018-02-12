const express = require('express');
const app = express();
const axios = require('axios');

// single application scoped instance of axios with pre set configuation
app.locals.axios = axios.create({
	baseURL: 'http://localhost:2018'
});

// api endpoint to that looks for the specified header
// then responds with the value of that header
// this is just hear to proove that the header gets forwarded
app.get('/api', (req, res) => {
	let trackedHeaders = {};
	const secretHeader = req.get('my-secret-header');
	if(secretHeader) {
		trackedHeaders.secretHeader = secretHeader;
	}
	res.json(trackedHeaders);
});

// a middleware that modifies the axios instance per prequest
app.use('*', (req, res, next) => {
	const secretHeader = req.get('my-secret-header');
	if(secretHeader) {
		req.app.locals.axios.defaults.headers.common['my-secret-header'] = secretHeader;
	} else {
		delete req.app.locals.axios.defaults.headers.common['my-secret-header'];
	}
	next();
});

// a generic route that makes the axios request without any additional code
// forwards the specified header
// displays the result
app.get('/', (req, res) => {
	const { axios } = req.app.locals;
	axios.get('/api')
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => {
			console.log('error', error);
			res.send(':-(');
		});
});

app.listen(2018, () => console.log('POC on port 2018!'));
