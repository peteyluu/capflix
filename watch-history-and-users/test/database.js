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

		it('should return userId for registered emails', (done) => {
			postgres.selectUserByEmail('Anika_Beahan@hotmail.com8000013', (err, data) => {
				expect(err).to.equal(null);
				expect(data.password).to.equal(undefined);
				expect(data).to.be.a('object');
				expect(data.id).to.be.a('number');
				expect(data.id).to.equal(8000013);
				done();
			})
		}) 

		it ('should return undefined for unregistred emails', (done) => {
			postgres.selectUserByEmail('alksdfjaldfksj@gmail.com', (err, data) => {
				expect(data).to.equal(undefined);
				done();
			})
		})
	})
})