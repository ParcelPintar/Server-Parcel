const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const app = require('../app');
const ParcelPintar = require('../models/ParcelPintar');

describe('parcel CRUD', () => {
   let dummyParcel = {
    gyro: '5b8268c53df7056da558f7ed',
    gps: '5b8268c53df7056da558f7ed',
  }
   let updatedParcel = {
    gyro: '5b82da1b87c0305000610ec6',
    gps: '5b82da1b87c0305000610ec6',
  }
   let tempId = ''
  
  after(done => {
    ParcelPintar.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
   describe('POST /parcels', () => {
  
    it('should return newly created Parcel', (done) => {
      chai.request(app)
      .post('/parcels')
      .send(dummyParcel)
      .end((err, response) => {
        console.log('AAAAAAAAAAAA', response.body);

        tempId = response.body._id

        response.status.should.equal(201);
        response.body.should.be.an('object');
        response.body.gyro.should.equal(dummyParcel.gyro);
        response.body.gps.should.equal(dummyParcel.gps);
        done();
      })
    })
  
    it('should return error 400 if object is invalid', (done) =>{
      chai.request(app)
      .post('/parcels')
      .send({})
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })
   describe('GET /parcels', () => {
    it('should list all parcels', (done) => {
      chai.request(app)
      .get('/parcels')
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('array');
        done();
      })
    })
  })
   describe('GET /parcels/:id', () => {
     it('should get the right parcel by id', (done) => {
      chai.request(app)
      .get(`/parcels/${tempId}`)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body._id.should.equal(tempId)
        response.body.should.be.an('object');
        response.body.should.have.property('gyro');
        response.body.should.have.property('gps');
        done();
      })
    })
     it('should get error if id invalid', (done) => {
      chai.request(app)
      .get(`/parcels/${911}`)
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })
   describe('PATCH /parcels/:id', () => {
    it('should return updated GPS', (done) => {
      chai.request(app)
      .patch(`/parcels/${tempId}`)
      .send(updatedParcel)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        response.body.gyro.should.equal(updatedParcel.gyro);
        response.body.gps.should.equal(updatedParcel.gps);
        done();
      })
    })
  
    it('should return error 400 if object is invalid', (done) =>{
      chai.request(app)
      .patch(`/parcels/${tempId}`)
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
      .delete(`/parcels/${tempId}`)
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        done();
      })
    })
  
    it('should return error 400 if id is invalid', (done) =>{
      chai.request(app)
      .delete(`/parcels/${911}`)
      .end((err, response) => {
        response.status.should.equal(400);
        response.body.should.have.property('error');
        done();
      })
    })
  })
}) 