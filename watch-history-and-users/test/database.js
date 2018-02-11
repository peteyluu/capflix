const { expect } = require('chai');
const pg = require('pg');
const postgres = require('../databases/postgres');

describe('Database', () => {
	describe('Postgres', () => {
		it('should connect to the database', (done) => {
			const client = new pg.Client({
				connectionString: "pg://localhost:5432/capflix_users"
			});
			client.connect((err) => {
				expect(err).to.not.be.an('error');
				client.end();
				done();
			})
		})
	})
})