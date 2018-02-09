const app = require('../index.js');
const chai = require('chai');
const { expect, should } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET Manifest Files', () => {
  it('should return status code 200 for existing resolution', done => {
    chai.request(app)
    .get('/manifest/somecontent?res=720')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status code 404 for non-existent resolution', done => {
    chai.request(app)
    .get('/manifest/somecontent?res=2410')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('GET Chunk Files', () => {
  it('should return status code 200 for existing resolution and chunk number', done => {
    chai.request(app)
    .get('/chunk/somecontent?res=720&chunkNumber=23')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status code 404 for non-existent resolution', done => {
    chai.request(app)
    .get('/chunk/somecontent?res=2410&chunkNumber=23')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for non-existent chunk number', done => {
    chai.request(app)
    .get('/chunk/somecontent?res=720&chunkNumber=203')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for non-existent resolution and chunk number', done => {
    chai.request(app)
    .get('/chunk/somecontent?res=2410&chunkNumber=203')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('POST Start Session', () => {
  it('should return status code 201 when content_id and user_id are provided', done => {
    chai.request(app)
    .post('/startsession')
      .send({ content_id: 123, user_id: 456 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should return a custom header called session_id', done => {
    chai.request(app)
    .post('/startsession')
      .send({ content_id: 123, user_id: 456 })
      .end((err, res) => {
        expect(res.headers.session_id).to.exist;
        done();
      });
  });
  it('should return status code 404 for non-integer content_id', done => {
    chai.request(app)
    .post('/startsession')
      .send({ content_id: 'a string', user_id: 456 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for non-integer user_id', done => {
    chai.request(app)
    .post('/startsession')
      .send({ content_id: 123, user_id: 'a string' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for no content_id being sent', done => {
    chai.request(app)
    .post('/startsession')
      .send({ user_id: 456 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return status code 404 for no user_id being sent', done => {
    chai.request(app)
    .post('/startsession')
      .send({ content_id: 123 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});