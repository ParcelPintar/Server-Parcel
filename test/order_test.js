const chaiHTTP = require("chai-http");
const chai = require("chai");
const { USER_LOGIN, USER_REGISTER } = require("../const/user_const");
const { ORDER_CREATE, ORDER_GET_BY_ID } = require("../const/order_const");
const { CREATE_GYRO } = require("../const/gyro_const");
const { CREATE_GPS } = require("../const/gps_const");
let expect = chai.expect;
chai.use(chaiHTTP);

let User = require("../models/User");
let Order = require("../models/Order");
let GPS = require("../models/GPS");
let Gyro = require("../models/Gyro");
let app = require("../app");

let test_args = {
	firstAccount: {
		name: "erithiana_sisijoan",
		email: "joanlamrack@gmail.com",
		password: "12340000"
	},
	secondAccount: {
		name: "Albert Henry",
		email: "creativeProgrammer@gmail.com",
		password: "rahasiadong"
	},
	gyro: {
		threshold: 0
	},
	gps: {
		long: 0,
		lat: 0
	}
};

describe("Orders", function() {
	this.timeout(5000);

	describe("POST/orders", () => {
		beforeEach(done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.firstAccount)
				.then(res => {
					expect(res).to.have.status(201);
					return chai.request(USER_REGISTER).send(test_args.secondAccount);
				})
				.then(res => {
					expect(res).to.have.status(201);
					done();
				})
				.catch(err => {});
		});

		afterEach(done => {
			User.deleteMany({})
				.then(() => {
					return Order.deleteMany({});
				})
				.then(() => {
					return GPS.deleteMany({});
				})
				.then(() => {
					return Gyro.deleteMany({});
				})
				.then(() => {
					done();
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("Should return the created order", done => {
			chai
				.request(app)
				.post(USER_LOGIN)
				.send({
					email: test_args.firstAccount.email,
					password: test_args.firstAccount.password
				})
				.end((err, res) => {
					expect(res).to.have.status(200);
					let token = req.body.token;

					chai
						.request(app)
						.post(CREATE_GYRO)
						.send(test_args.gyro)
						.end((err, res) => {
							expect(res).to.have.status(201);
							let gyro_id = res.body._id;

							chai
								.request(app)
								.post(CREATE_GPS)
								.send(test_args.gps)
								.end((err, res) => {
									let gps_id = res.body._id;
									expect(res).to.have.status(201);
									chai
										.request(app)
										.post(ORDER_CREATE)
										.set("token", token)
										.send({
											receiver: "",
											destination: "",
											address: "pondok Indah"
										})
										.end((err, res) => {
											expect(res).to.have.status(201);
											expect(res.body).to.be.a("object");
											expect(res.body.name).to.equal(
												test_args.firstAccount.name
											);
											expect(res.body.password).to.not.equal(
												test_args.firstAccount.password
											);
											expect(res.body.email).to.equal(
												test_args.firstAccount.email
											);
											done();
										});
								});
						});
				});
		});
	});
});
