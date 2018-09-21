const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const app = require("../app");
const ParcelPintar = require("../models/ParcelPintar");
const GPS = require("../models/GPS");
const Gyro = require("../models/Gyro");

describe("parcel CRUD", function() {
	this.timeout(3000);

	after(done => {
		ParcelPintar.deleteMany({})
			.then(() => {
				return Gyro.deleteMany({}).then(() => {
					return GPS.deleteMany({}).then(() => {
						done();
					});
				});
			})
			.catch(err => {
				console.log(err);
			});
	});

	let dummyGPS = {
		type: "Point",
		long: 106.78,
		lat: -6.26
	};

	let dummyGyro = {
		threshold: 30
	};

	let tempGyroId = "";
	let tempGPSId = "";

	describe("POST /gps", () => {
		it("should return newly created GPS", done => {
			chai.request(app)
				.post("/gps")
				.send(dummyGPS)
				.end((err, response) => {
					tempGPSId = response.body._id;

					response.status.should.equal(201);
					response.body.should.be.an("object");
					response.body.location.type.should.equal(dummyGPS.type);
					response.body.location.coordinates[0].should.equal(
						dummyGPS.long
					);
					response.body.location.coordinates[1].should.equal(
						dummyGPS.lat
					);
					done();
				});
		});

		it("should return error 400 if object is invalid", done => {
			chai.request(app)
				.post("/gps")
				.send({})
				.end((err, response) => {
					response.status.should.equal(400);
					response.body.should.have.property("error");
					done();
				});
		});
	});

	describe("POST /gyro", () => {
		it("should return newly created Gyro", done => {
			chai.request(app)
				.post("/gyro")
				.send(dummyGyro)
				.end((err, response) => {
					tempGyroId = response.body._id;

					console.log("AAAA", response.body);

					response.status.should.equal(201);
					response.body.should.be.an("object");
					response.body.threshold.should.equal(dummyGyro.threshold);
					done();
				});
		});

		it("should return error 400 if object is invalid", done => {
			chai.request(app)
				.post("/gyro")
				.send({})
				.end((err, response) => {
					response.status.should.equal(400);
					response.body.should.have.property("error");
					done();
				});
		});
	});

	let tempPPId = "";

	describe("POST /parcels", () => {
		it("should return newly created Parcel", done => {
			let dummyParcel = {
				gyro: tempGyroId,
				gps: tempGPSId
			};

			chai.request(app)
				.post("/parcels")
				.send(dummyParcel)
				.end((err, response) => {
					tempPPId = response.body._id;

					response.status.should.equal(201);
					response.body.should.be.an("object");
					response.body.gyro.should.equal(dummyParcel.gyro);
					response.body.gps.should.equal(dummyParcel.gps);
					done();
				});
		});

		it("should return error 400 if object is invalid", done => {
			chai.request(app)
				.post("/parcels")
				.send({})
				.end((err, response) => {
					response.status.should.equal(400);
					response.body.should.have.property("error");
					done();
				});
		});
	});
	describe("GET /parcels", () => {
		it("should list all parcels", done => {
			chai.request(app)
				.get("/parcels")
				.end((err, response) => {
					response.status.should.equal(200);
					response.body.should.be.an("array");
					done();
				});
		});
	});
	describe("GET /parcels/:id", () => {
		it("should get the right parcel by id", done => {
			chai.request(app)
				.get(`/parcels/${tempPPId}`)
				.end((err, response) => {
					response.status.should.equal(200);
					response.body._id.should.equal(tempPPId);
					response.body.should.be.an("object");
					response.body.should.have.property("gyro");
					response.body.should.have.property("gps");
					done();
				});
		});
		it("should get error if id invalid", done => {
			chai.request(app)
				.get(`/parcels/${911}`)
				.end((err, response) => {
					response.status.should.equal(400);
					response.body.should.have.property("error");
					done();
				});
		});
	});
	describe("PATCH /parcels/:id", () => {
		it("should return updated GPS", done => {
			let updatedParcel = {
				gyro: tempGyroId,
				gps: tempGPSId
			};

			chai.request(app)
				.patch(`/parcels/${tempPPId}`)
				.send(updatedParcel)
				.end((err, response) => {
					response.status.should.equal(200);
					response.body.should.be.an("object");
					response.body.gyro.should.equal(updatedParcel.gyro);
					response.body.gps.should.equal(updatedParcel.gps);
					done();
				});
		});

		it("should return error 400 if object is invalid", done => {
			chai.request(app)
				.patch(`/parcels/${tempPPId}`)
				.send({ gyro: "a" })
				.end((err, response) => {
					response.status.should.equal(400);
					response.body.should.have.property("error");
					done();
				});
		});
	});
	describe("DELETE /gps/:id", () => {
		it("should return deleted GPS", done => {
			chai.request(app)
				.delete(`/parcels/${tempPPId}`)
				.end((err, response) => {
					response.status.should.equal(200);
					response.body.should.be.an("object");
					done();
				});
		});

		it("should return error 400 if id is invalid", done => {
			chai.request(app)
				.delete(`/parcels/${911}`)
				.end((err, response) => {
					response.status.should.equal(400);
					response.body.should.have.property("error");
					done();
				});
		});
	});
});
