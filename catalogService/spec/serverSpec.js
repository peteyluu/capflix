const app = require('./server.js');
const db = require('../db/index');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('GET content information for search and browse service', () => {
  it('should return status code 200 for existing TV content', (done) => {
    chai.request(app)
      .get('/content/sb/TV1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('director');
        res.body.should.have.property('actors');
        res.body.should.have.property('genres');
        res.body.should.have.property('category');
        res.body.should.have.property('mpRating');
        res.body.should.have.property('airYear');
        res.body.should.have.property('capflixOriginal');
        res.body.should.have.property('trailers');
        res.body.should.have.property('seasonCount');
        res.body.should.have.property('episodes');
        done();
      });
  });
  it('should return status code 200 for existing movie content', (done) => {
    chai.request(app)
      .get('/content/sb/MOV1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('director');
        res.body.should.have.property('actors');
        res.body.should.have.property('genres');
        res.body.should.have.property('category');
        res.body.should.have.property('mpRating');
        res.body.should.have.property('airYear');
        res.body.should.have.property('capflixOriginal');
        res.body.should.have.property('trailers');
        res.body.should.have.property('content');
        done();
      });
  });
  it('should return status code 404 for non-existent TV content', (done) => {
    chai.request(app)
      .get('/content/sb/TVNOTCONTENT')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for non-existent movie content', (done) => {
    chai.request(app)
      .get('/content/sb/MOVNOTCONTENT')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('GET content information for watch history service', () => {
  it('should return status code 200 for existing TV content', (done) => {
    chai.request(app)
      .get('/content/wh/TV1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('category');
        res.body.should.have.property('capflixOriginal');
        done();
      });
  });
  it('should return status code 200 for existing movie content', (done) => {
    chai.request(app)
      .get('/content/wh/MOV1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('category');
        res.body.should.have.property('capflixOriginal');
        done();
      });
  });
  it('should return status code 404 for non-existent TV content', (done) => {
    chai.request(app)
      .get('/content/wh/TVNOTCONTENT')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for non-existent movie content', (done) => {
    chai.request(app)
      .get('/content/wh/MOVNOTCONTENT')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
