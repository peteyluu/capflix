const app = require('../index');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET search query', () => {
  it('should return status code 200', (done) => {
    chai.request(app)
      .get('/search/horror')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET categories', () => {
  it('should return status code 200 on default categories', (done) => {
    chai.request(app)
      .get('/categories')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status code 200 on request categories', (done) => {
    chai.request(app)
      .get('/categories?cats=["action","anime"]')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET content by id', () => {
  it('should return status code 200', (done) => {
    chai.request(app)
      .get('/content/2672816')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status code 400', (done) => {
    chai.request(app)
      .get('/content/-1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('POST summary movie', () => {
  const data = [
    {
      category_name: 'action',
      content_id: 10000001,
      thumbnail: 'http://lorempixel.com/640/480/0',
      mpr: 'g',
      description: 'description0',
      capflix_original: true,
      content_name: 'contentname0',
      airdate: 2017,
    },
  ];

  it('should return status code 201', (done) => {
    chai.request(app)
      .post('/summary/movie')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('DELETE summary movie', () => {
  const data = [
    {
      category_name: 'action',
      content_id: 10000001,
      thumbnail: 'http://lorempixel.com/640/480/0',
      mpr: 'g',
      description: 'description0',
      capflix_original: true,
      content_name: 'contentname0',
      airdate: 2017,
    },
  ];

  it('should return status code 201', (done) => {
    chai.request(app)
      .delete('/summary/movie')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });
});
