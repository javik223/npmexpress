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
const userData = {
	username: 'Ugwudike',
	userType: 'admin',
	permissions: {
		invoice: ['read', 'create', 'delete', 'update'],
		quote: ['read', 'update'],
		userAccount: ['read', 'create', 'update'],
	},
};

const validToken = ACLT.generateToken(userData);
let permissions = {
	invoice: ['read', 'create', 'delete', 'update'],
	quote: ['read', 'update'],
	userAccount: ['read', 'create', 'update'],
};

describe('Access Control Test Suite', () => {
	describe('Expired Token', () => {
		it('should return return false when expired token is used', () => {
			const Access = new ACLT.AccessControl(expiredToken);
			Access.can('userAccount:create').should.equal(false);
		});
	});

	describe('Valid Token', () => {
		it('should return true for invoice:create', () => {
			const Access = new ACLT.AccessControl(validToken);
			Access.can('invoice:create').should.equal(true);
		});

		it('should return false for non-available data', () => {
			const Access = new ACLT.AccessControl(validToken);
			Access.can('teachers:create').should.equal(false);
		});
	});

	describe('Invalid Token', () => {
		it('should return false for invalid token', () => {
			const Access = new ACLT.AccessControl(invalidToken);
			Access.can('teachers:create').should.equal(false);
		});
	});

	describe('No token or permissions object supplied', () => {
		it('should throw an error if no permissions object or token is supplied', () => {
			(function() {
				new ACLT.AccessControl().can('blog:create');
			}.should.throw(Error));
		});
	});
});

describe('generateToken', () => {
	it('should generate a valid token if a data object is supplied', () => {
		const data = {
			name: 'Victory Ugwudike',
			password: 'xperience',
		};
		ACLT.generateToken(data).should.be.a('string');
	});

	it('should throw and error if no data object is passed', () => {
		(function() {
			ACLT.generateToken();
		}.should.throw(Error));
	});
});
