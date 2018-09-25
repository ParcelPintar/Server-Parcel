const chaiHTTP = require("chai-http");
const chai = require("chai");
const { USER_LOGIN, USER_REGISTER } = require("../const/user_const");
const { ORDER_CREATE, ORDER_GET_BY_ID } = require("../const/order_const");
const { CREATE_PARCEL } = require("../const/pp_const");
let expect = chai.expect;
chai.use(chaiHTTP);

let User = require("../models/User");
let Order = require("../models/Order");
let Parcel = require("../models/ParcelPintar");
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
	parcel: { gyro: {}, gps: {} }
};

describe("Orders", function() {
	this.timeout(15000);

	describe("POST/orders", () => {
		beforeEach(done => {
			User.deleteMany({})
				.then(() => {
					return chai
						.request(app)
						.post(USER_REGISTER)
						.send(test_args.firstAccount);
				})
				.then(res => {
					expect(res).to.have.status(201);
					done();
				})
				.catch(err => {
					console.log(err);
				});
		});

		afterEach(done => {
			User.deleteMany({})
				.then(() => {
					return Order.deleteMany({});
				})
				.then(() => {
					return User.deleteMany({});
				})
				.then(() => {
					return Parcel.deleteMany({});
				})
				.then(() => {
					done();
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("Should return the created order", done => {
			chai.request(app)
				.post(USER_LOGIN)
				.send({
					email: test_args.firstAccount.email,
					password: test_args.firstAccount.password
				})
				.then(async res => {
					expect(res).to.have.status(200);
					let token = res.body.token;

					try {
						let createAnotherUserResponse = await chai
							.request(app)
							.post(USER_REGISTER)
							.send(test_args.secondAccount);

						expect(createAnotherUserResponse).to.have.status(201);
						let new_user_id = createAnotherUserResponse.body._id;

						let parcel_create_response = await chai
							.request(app)
							.post(CREATE_PARCEL);
						expect(parcel_create_response).to.have.status(201);

						let order_create_response = await chai
							.request(app)
							.post(ORDER_CREATE)
							.set("token", token)
							.send({
								receiver: new_user_id,
								destination: {
									long: 234234234,
									lat: 234234234234
								},
								pickup: {
									long: 234123421,
									lat: 13234e234
								},
								address: "pondok Indah",
								parcel: parcel_create_response.body._id
							});
						console.log(order_create_response.body);
						expect(order_create_response).to.have.status(201);
						done();
					} catch (err) {
						console.log(err);
					}
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("should return receiver is required", done => {
			chai.request(app)
				.post(USER_LOGIN)
				.send({
					email: test_args.firstAccount.email,
					password: test_args.firstAccount.password
				})
				.then(async res => {
					expect(res).to.have.status(200);
					let token = res.body.token;

					try {
						let parcel_create_response = await chai
							.request(app)
							.post(CREATE_PARCEL)
							.send(test_args.parcel);

						expect(parcel_create_response).to.have.status(201);

						let order_create_response = await chai
							.request(app)
							.post(ORDER_CREATE)
							.set("token", token)
							.send({
								destination: 12.78,
								address: "pondok Indah"
							});

						expect(order_create_response).to.have.status(400);
						done();
					} catch (err) {
						console.log(err);
					}
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("should return not authorized ", done => {
			chai.request(app)
				.post(USER_LOGIN)
				.send({
					email: test_args.firstAccount.email,
					password: test_args.firstAccount.password
				})
				.then(async res => {
					expect(res).to.have.status(200);
					let token = res.body.token;

					try {
						let createAnotherUserResponse = await chai
							.request(app)
							.post(USER_REGISTER)
							.send(test_args.secondAccount);

						expect(createAnotherUserResponse).to.have.status(201);
						let new_user_id = createAnotherUserResponse.body._id;

						let parcel_create_response = await chai
							.request(app)
							.post(CREATE_PARCEL);
						expect(parcel_create_response).to.have.status(201);

						let order_create_response = await chai
							.request(app)
							.post(ORDER_CREATE)
							.send({
								receiver: new_user_id,
								destination: 12.78,
								address: "pondok Indah",
								parcel: parcel_create_response.body._id
							});
						expect(order_create_response).to.have.status(403);
						expect(order_create_response.body).to.have.property(
							"error"
						);
						expect(order_create_response.body.error).to.be.equal(
							"not authorized"
						);
						done();
					} catch (err) {
						console.log(err);
					}
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("should return invalid token", done => {
			chai.request(app)
				.post(USER_LOGIN)
				.send({
					email: test_args.firstAccount.email,
					password: test_args.firstAccount.password
				})
				.then(async res => {
					expect(res).to.have.status(200);
					let token = res.body.token;
					try {
						let createAnotherUserResponse = await chai
							.request(app)
							.post(USER_REGISTER)
							.send(test_args.secondAccount);

						expect(createAnotherUserResponse).to.have.status(201);
						let new_user_id = createAnotherUserResponse.body._id;

						let parcel_create_response = await chai
							.request(app)
							.post(CREATE_PARCEL);
						expect(parcel_create_response).to.have.status(201);

						let order_create_response = await chai
							.request(app)
							.post(ORDER_CREATE)
							.set("token", token.slice(1))
							.send({
								receiver: new_user_id,
								destination: 12.78,
								address: "pondok Indah",
								parcel: parcel_create_response.body._id
							});
						expect(order_create_response).to.have.status(400);
						expect(order_create_response.body).to.have.property(
							"error"
						);
						expect(order_create_response.body.error).to.be.equal(
							"invalid token"
						);
						done();
					} catch (err) {
						console.log(err);
					}
				})
				.catch(err => {
					console.log(err);
				});
		});
	});
});
