const chai = require("chai");
let expect = chai.expect;
const authHelper = require("../helpers/authHelper");

describe("Auth Helper", function() {
	it("should match password and hash correctly", done => {
		let password = "askjdfjasjdfas";
		let hashedPassword = authHelper.hashpass(password);
		let matchWithHash = authHelper.comparehash(password, hashedPassword);
		expect(matchWithHash).to.be.equal(true);
		done();
	});
});
