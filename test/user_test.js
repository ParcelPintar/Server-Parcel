const chaiHTTP = require("chai-http");
const chai = require("chai");
const { USER_LOGIN, USER_REGISTER } = require("../const/user_const");
let expect = chai.expect;
chai.use(chaiHTTP);

let User = require("../models/User");

let app = require("../app");

let test_args = {
	normal: {
		name: "erithiana_sisijoan",
		email: "joanlamrack@gmail.com",
		password: "12340000"
	},
	wrong_email_format: {
		name: "brian_pradipta",
		email: "brianbriangmail.com",
		password: "asdfasdfasdf"
	},
	wrong_password_length: {
		name: "maharamarama",
		email: "lah@gmail.com",
		password: "lock"
	},
	unregistered: {
		name: "Albert Henry",
		email: "creativeProgrammer@gmail.com",
		password: "rahasiadong"
	}
};

describe("Users", function() {
	this.timeout(5000);

	describe("POST/register", () => {
		afterEach(done => {
			User.deleteMany({})
				.then(() => {
					done();
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("should return the created new User + encrypted password", done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.normal)
				.end((err, res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.be.a("object");
					expect(res.body.name).to.equal(test_args.normal.name);
					expect(res.body.password).to.not.equal(test_args.normal.password);
					expect(res.body.email).to.equal(test_args.normal.email);
					done();
				});
		});
		it("should show error email is wrong format", done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.wrong_email_format)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.a("object");
					expect(res.body).to.have.property("error");
					expect(res.body.error).to.equal(
						"User validation failed: email: Please input a valid email format"
					);
					done();
				});
		});
		it("should show invalid length of password alert", done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.wrong_password_length)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.be.a("object");
					expect(res.body).to.have.property("error");
					expect(res.body.error).to.equal(
						"User validation failed: password: Password length minimum 6"
					);
					done();
				});
		});

		it("should return fail since mail is not unique", done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.normal)
				.end((err, res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.be.a("object");
					expect(res.body.name).to.equal(test_args.normal.name);
					expect(res.body.password).to.not.equal(test_args.normal.password);
					expect(res.body.email).to.equal(test_args.normal.email);

					chai
						.request(app)
						.post(USER_REGISTER)
						.send(test_args.normal)
						.end((err, res) => {
							expect(res).to.have.status(400);
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.equal("Email already used");
							done();
						});
				});
		});
	});

	describe("POST/login", () => {
		afterEach(done => {
			User.deleteMany({})
				.then(() => {
					done();
				})
				.catch(err => {
					console.log(err);
				});
		});

		it("should return user / password is wrong", done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.normal)
				.end((err, res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.be.a("object");
					expect(res.body.name).to.equal(test_args.normal.name);
					expect(res.body.password).to.not.equal(test_args.normal.password);
					expect(res.body.email).to.equal(test_args.normal.email);

					chai
						.request(app)
						.post(USER_LOGIN)
						.send({
							email: test_args.unregistered.email,
							password: test_args.unregistered.password
						})
						.end((err, res) => {
							expect(res).to.have.status(404);
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.equal("User not registered");
							done();
						});
				});
		});
		it("should return success message and token", done => {
			chai
				.request(app)
				.post(USER_REGISTER)
				.send(test_args.normal)
				.end((err, res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.be.a("object");
					expect(res.body.name).to.equal(test_args.normal.name);
					expect(res.body.password).to.not.equal(test_args.normal.password);
					expect(res.body.email).to.equal(test_args.normal.email);

					chai
						.request(app)
						.post(USER_LOGIN)
						.send({
							email: test_args.normal.email,
							password: test_args.normal.password
						})
						.end((err, res) => {
							expect(res).to.have.status(200);
							expect(res.body).to.have.property("token");
							done();
						});
				});
		});
	});
});
