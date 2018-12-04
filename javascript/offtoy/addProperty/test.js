const isOdd = require('./index');
const expect = require('chai').expect;

describe("UnitTests", function() {
  it("should_return_false_when_input_is_even", function() {
// Failure message:
// This offtoy has no failure messages
    expect(isOdd(78)).to.be.false;
  });
  it("should_return_a_boolean", function() {
// Failure message:
// This offtoy has no failure messages
    expect(typeof isOdd(45)).to.equal("boolean");
  });
  it("should_return_true_when_input_is_odd", function() {
// Failure message:
// This offtoy has no failure messages
    expect(isOdd(21)).to.be.true;
  });
});