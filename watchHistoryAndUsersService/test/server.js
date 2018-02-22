const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');
chai.use(chaiHttp);

describe('Server', () => {
	describe('Server should connect and having working endpoints', () => {
		it('Should connect to port 3000', (done) => {
			chai
				.request('http://localhost:3000')
				.get('/')
				.end((err, res) => {
					if (err) return done(err);
					done();
				})
		}) 
	})

	describe('/login', () => {
		it('Server should login existing users successfully', (done) => {
			chai
				.request('http://localhost:3000')
				.get('/login')
				.send(
					JSON.stringify({
						email: "Anika_Beahan@hotmail.com8000013",
						password: "UFft6aZS2OdAK78"
					})
				)
				.end((err, res) => {
					if (err) return done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					// expect(res.body.id).to.be.a('number');
					// expect(res.body.id).to.equal(8000013);
					done();
				})
		})
	})
})

//Exits mocha afterwards
after(() => process.exit(0));