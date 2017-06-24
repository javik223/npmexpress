const ACLT = require('./AccessControl');
const should = require('chai').should();
const expect = require('chai').expect();

const expiredToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVWd3dWRpa2UiLCJ' +
	'1c2VyVHlwZSI6ImFkbWluIiwicm9sZXMiOnsiaW52b2ljZSI6WyJyZWFkIiwiY3JlYXRlIiwiZGVsZXR' +
	'lIiwidXBkYXRlIl0sInF1b3RlIjpbInJlYWQiLCJ1cGRhdGUiXSwidXNlckFjY291bnQiOlsicmVhZCI' +
	'sImNyZWF0ZSIsInVwZGF0ZSJdfX0sImlhdCI6MTQ5Nzc5NzM4NiwiZXhwIjoxNDk3Nzk5MTg2LCJhdWQ' +
	'iOiJCcml0dGFuaWEtVSBBcHAiLCJpc3MiOiJCcml0dGFuaWEtVSJ9.s9tonWT30cTPaTSHhwjUPbVZQL' +
	'92xybEWVpYeYJo38o';
const invalidToken = 'iadfafiafiafiafafasfafdakfas';
const validToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVWd3dWRpa2UiLCJ1c2VyVHlwZSI6ImFkbWluIiwicGVybWlzc2lvbnMiOnsiaW52b2ljZSI6WyJyZWFkIiwiY3JlYXRlIiwiZGVsZXRlIiwidXBkYXRlIl0sInF1b3RlIjpbInJlYWQiLCJ1cGRhdGUiXSwidXNlckFjY291bnQiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdfX0sImlhdCI6MTQ5ODM0MzY5NSwiZXhwIjoxNDk4MzQ1NDk1LCJhdWQiOiJCcml0dGFuaWEtVSBBcHAiLCJpc3MiOiJCcml0dGFuaWEtVSJ9.l-ceMDR9WPB6aPrbTvfFGaUeVdzIO4vXvvgYeraMbh4';
let permissions = {
	invoice: ['read', 'create', 'delete', 'update'],
	quote: ['read', 'update'],
	userAccount: ['read', 'create', 'update'],
};

describe('Access Control Test Suite', () => {
	it('Using Expired Token should return false', () => {
		const Access = new ACLT.AccessControl(expiredToken);
		Access.can('userAccount:create').should.equal(false);
	});

	it('Using a valid token should return true for invoice:create', () => {
		const Access = new ACLT.AccessControl(validToken);
		Access.can('invoice:create').should.equal(true);
	});

	it('Using a valid token should return true for invoice:create', () => {
		const Access = new ACLT.AccessControl(validToken);
		Access.can('invoice:create').should.equal(true);
	});

	it('Getting a non available data object should return false', () => {
		const Access = new ACLT.AccessControl(permissions);
		Access.can('teachers:create').should.equal(false);
	});

	it('Should return error for invalid token', () => {
		const Access = new ACLT.AccessControl(invalidToken);
		Access.can('teachers:create').should.equal(false);
	});
});

describe('Check Errors:', () => {
	it('It should error if given no JWT token or objects', () => {
		(function() {
			new ACLT.AccessControl().can('blog:create');
		}.should.throw(Error));
	});
});

function testingError() {
	throw new Error('Lang');
}
