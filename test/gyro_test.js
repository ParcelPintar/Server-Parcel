const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const app = require('../app');
const Gyro = require('../models/Gyro');

describe('Gyro CRUD', function () {
  this.timeout(3000);

  let dummyGyro = {
    threshold: 30
  }

  let updatedGyro = {
    threshold: 50
  }

  let tempId = ''
  
  after(done => {
    Gyro.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  describe('POST /gyro', () => {
  
    it('should return newly created Gyro', (done) => {
      chai.request(app)
      .post('/gyro')
      .send(dummyGyro)
      .end((err, response) => {
        tempId = response.body._id

        console.log('AAAA', response.body);

        response.status.should.equal(201);
        response.body.should.be.an('object');
        response.body.threshold.should.equal(dummyGyro.threshold);
        done();
      })
    })
  
    it('should return error 400 if object is invalid', (done) =>{
      chai.request(app)
      .post('/gyro')
      .send({})
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })

  describe('GET /gyro', () => {
    it('should list all Gyroes', (done) => {
      chai.request(app)
      .get('/gyro')
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('array');
        done();
      })
    })
  })

  describe('GET /Gyro/:id', () => {

    it('should get the right Gyro by id', (done) => {
      chai.request(app)
      .get(`/gyro/${tempId}`)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body._id.should.equal(tempId)
        response.body.should.be.an('object');
        response.body.should.have.property('threshold');
        done();
      })
    })

    it('should get error if id invalid', (done) => {
      chai.request(app)
      .get(`/gyro/${911}`)
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })

  describe('PATCH /gyro/:id', () => {
    it('should return updated Gyro', (done) => {
      chai.request(app)
      .patch(`/gyro/${tempId}`)
      .send(updatedGyro)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.threshold.should.equal(updatedGyro.threshold);
        done();
      })
    })
  
    it('should return error 400 if object is invalid', (done) =>{
      chai.request(app)
      .patch(`/gyro/${tempId}`)
      .send({threshold: 'a'})
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })

  describe('DELETE /gyro/:id', () => {
    it('should return deleted Gyro', (done) => {
      chai.request(app)
      .delete(`/gyro/${tempId}`)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.should.have.property('threshold');
        done();
      })
    })
  
    it('should return error 400 if id is invalid', (done) =>{
      chai.request(app)
      .delete(`/gyro/${911}`)
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })
})