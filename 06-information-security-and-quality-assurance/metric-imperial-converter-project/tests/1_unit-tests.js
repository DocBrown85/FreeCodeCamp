/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function(done) {
      var input = "123.456Kg";
      assert.equal(convertHandler.getNum(input), 123.456);
      done();
    });

    test("Fractional Input", function(done) {
      var input = "2/3Kg";
      assert.equal(convertHandler.getNum(input), 0.66667);
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      var input = "123.456/456.123lbs";
      assert.equal(convertHandler.getNum(input), 0.27066);
      done();
    });

    test("Double Fraction Input)", function(done) {
      var input = "42/42/42lbs";
      assert.equal(convertHandler.getNum(input), 0.02381);
      done();
    });

    test("No Numerical Input", function(done) {
      assert.equal(convertHandler.getNum("kg"), 1);
      assert.equal(convertHandler.getNum("lbs"), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
      });
      done();
    });

    test("Unknown Unit Input", function(done) {
      assert.equal(convertHandler.getUnit("qwertkkmi"), "invalid unit");
      assert.equal(convertHandler.getUnit("asdfglbs"), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      //see above example for hint
      assert.fail();
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function(done) {
      assert.fail();
      done();
    });

    test("Mi to Km", function(done) {
      assert.fail();
      done();
    });

    test("Km to Mi", function(done) {
      assert.fail();
      done();
    });

    test("Lbs to Kg", function(done) {
      assert.fail();
      done();
    });

    test("Kg to Lbs", function(done) {
      assert.fail();
      done();
    });
  });
});
