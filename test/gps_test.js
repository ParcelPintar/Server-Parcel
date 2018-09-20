const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const app = require('../app');
const GPS = require('../models/GPS');

describe('gps CRUD', () => {

  let dummyGPS = {
    type: 'Point',
    long: 106.78,
    lat: -6.26
  }

  let updatedGPS = {
    type: 'Point',
    long: 9,
    lat: 11
  }

  let tempId = ''
  
  after(done => {
    GPS.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  describe('POST /gps', () => {
  
    it('should return newly created GPS', (done) => {
      chai.request(app)
      .post('/gps')
      .send(dummyGPS)
      .end((err, response) => {
        tempId = response.body._id

        response.status.should.equal(201);
        response.body.should.be.an('object');
        response.body.location.type.should.equal(dummyGPS.type);
        response.body.location.coordinates[0].should.equal(dummyGPS.long);
        response.body.location.coordinates[1].should.equal(dummyGPS.lat);
        done();
      })
    })
  
    it('should return error 400 if object is invalid', (done) =>{
      chai.request(app)
      .post('/gps')
      .send({})
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })

  describe('GET /gps', () => {
    it('should list all GPSes', (done) => {
      chai.request(app)
      .get('/gps')
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('array');
        done();
      })
    })
  })

  describe('GET /gps/:id', () => {

    it('should get the right gps by id', (done) => {
      chai.request(app)
      .get(`/gps/${tempId}`)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body._id.should.equal(tempId)
        response.body.should.be.an('object');
        response.body.should.have.property('location');
        response.body.location.should.have.property('type');
        response.body.location.should.have.property('coordinates');
        done();
      })
    })

    it('should get error if id invalid', (done) => {
      chai.request(app)
      .get(`/gps/${911}`)
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })

  describe('PATCH /gps/:id', () => {
    it('should return updated GPS', (done) => {
      chai.request(app)
      .patch(`/gps/${tempId}`)
      .send(updatedGPS)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.location.type.should.equal(updatedGPS.type);
        response.body.location.coordinates[0].should.equal(updatedGPS.long);
        response.body.location.coordinates[1].should.equal(updatedGPS.lat);
        done();
      })
    })
  
    it('should return error 400 if object is invalid', (done) =>{
      chai.request(app)
      .patch(`/gps/${tempId}`)
      .send({})
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })

  describe('DELETE /gps/:id', () => {
    it('should return deleted GPS', (done) => {
      chai.request(app)
      .delete(`/gps/${tempId}`)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.location.should.have.property('type');
        response.body.location.should.have.property('coordinates');
        done();
      })
    })
  
    it('should return error 400 if id is invalid', (done) =>{
      chai.request(app)
      .delete(`/gps/${911}`)
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })
})