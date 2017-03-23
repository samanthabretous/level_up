process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../server');
const models = require('../server/db/models');

const Application = models.application;

describe('Application tests', () => {
  // fake application data that we'll use for tests
  const apps = [
    { location: 'San Fran', dateApplied: '3/20/17', postURL: 'github.com', rank: 3, status: 5 },
    { location: 'NY', dateApplied: '3/20/17', postURL: 'twitter.com', rank: 3 },
    { location: 'Austin', dateApplied: '3/21/17', postURL: 'facebook.com', rank: 5 },
  ];
  // use 'before' to seed your database with data before your tests
  // you only need one 'before' statement
  // there's also a 'beforeEach' function runs before each of your tests, individually
  before(() => Application.sync({ force: true })
    .then(() => Application.bulkCreate(apps))
    .catch(err => console.log('DB Err!', err)));

  it('/api/application get request should respond with all applications', (done) => {
    supertest(server)
      .get('/api/application/')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].location).equal(apps[0].location);
        expect(res.body[1].location).equal(apps[1].location);
        expect(res.body[2].location).equal(apps[2].location);
        done();
      });
  });
  it('"/api/application" post request should respond with a new application', (done) => {
    const newApp = { location: 'San Fran', dateApplied: '3/22/17', postURL: 'engineering.com', rank: 3, companyId: 1, positionId: 1, sourceId: 1, userId: 1 };
    supertest(server)
      .post('/api/application/')
      .send(newApp)
      .end((err, res) => {
        expect(res.body).be.a('object');
        expect(res.body).to.have.property('userId');
        done();
      });
  });

  it('"/api/application/id/:id" should respond with a application', (done) => {
    supertest(server)
    .get('/api/application/id/4')
    .end((err, res) => {
      expect(res.body.postURL).equal('engineering.com');
      done();
    });
  });

  it('"/api/application/user/:userId" should respond with all applications based off the user', (done) => {
    supertest(server)
    .get('/api/application/user/1')
    .end((err, res) => {
      expect(res.body.length).gt(0);
      expect(res.body).be.a('array');
      expect(res.body[0]).to.have.property('company');
      done();
    });
  });

  it('"/api/application/rejected/:id" should update application', (done) => {
    supertest(server)
    .put('/api/application/rejected/1')
    .send({ rejected: true })
    .end((err, res) => {
      expect(res.body).eql([ 1 ]);
      done();
    });
  });
});
