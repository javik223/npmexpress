const express = require('express');
const morgan = require('morgan');
const app = express();
const compression = require('compression');
const jwt = require('jsonwebtoken');
const ACLT = require('./helpers/AccessControl');

const userData = {
	username: 'Ugwudike',
	userType: 'admin',
	permissions: {
		invoice: ['read', 'create', 'delete', 'update'],
		quote: ['read', 'update'],
		userAccount: ['read', 'create', 'update'],
	},
};
let token = ACLT.generateToken(userData);
// console.log('Token: ', token);
// let permissions = {
// 	invoice: ['read', 'create', 'delete', 'update'],
// 	quote: ['read', 'update'],
// 	userAccount: ['read', 'create', 'update'],
// };

console.log(new ACLT.AccessControl(token).can('userAccount:create'));

app.use(morgan('tiny'));
app.use(compression());
app.get('/', (req, res) => {
	// res.send(token);
	res.send(`<h1>Hmmn Ok<h1>`);
});
app.listen(3000, () => {
	console.log("I'm listening on port 3000");
});
