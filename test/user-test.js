process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../server');
const models = require('../server/db/models');

const User = models.user;

describe('User tests', () => {
  // fake user data that we'll use for tests
  const users = [
    { email: 'test1@gmail.com', password: 'password1' },
    { email: 'test2@gmail.com', password: 'password2' },
    { email: 'test3@gmail.com', password: 'password3' },
  ];
  // use 'before' to seed your database with data before your tests
  // you only need one 'before' statement
  // there's also a 'beforeEach' function runs before each of your tests, individually
  before(() => User.sync({ force: true })
    .then(() => User.bulkCreate(users, { validate: true, individualHooks: true }))
    .catch((err) => console.log('DB Err!', err)));

  it('demo test, should pass', () => {
    expect(3).equal(3);
  });

  // example of how to do a test to get all users route
  it('/users should respond with all users', (done) => {
    supertest(server)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].email).equal(users[0].email);
        expect(res.body[1].email).equal(users[1].email);
        expect(res.body[2].email).equal(users[2].email);
        done();
      });
  });
  it('"/api/user/registration" should respond with a new user', (done) => {
    const newUser = { email: 'mickey@disney.com', password: 'password1' };
    supertest(server)
      .post('/api/user/registration')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).be.a('object');
        expect(res.body).to.have.property('email');
        done();
      });
  });

  it('"/api/user/authentication" should respond with a user', (done) => {
    const user = { email: 'test1@gmail.com', password: 'password1' };
    supertest(server)
    .post('/api/user/authentication')
    .send(user)
    .end((err, res) => {
      expect(res.body).be.a('object');
      expect(res.body.email).equal('test1@gmail.com');
      expect(res.body.password).equal(null);
      done();
    });
  });

  // clean up database after running test
  after((done) => {
    models.user.destroy({
      where: {
        email: 'mickey@disney.com',
      },
    });
    done();
  });
});
