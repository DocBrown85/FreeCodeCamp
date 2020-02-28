/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
const math = require("mathjs");

function ConvertHandler() {
  this.getNum = function(input) {
    if (!input) return "invalid number and unit";

    const numberRegex = /^((\d+\.\d+|\d+)(\/(\d+\.\d+|\d+))*)/;
    const match = input.match(numberRegex);
    if (match === null) {
      // input has no number, only a unit
      return 1;
    }
    const number = match[1];

    const result = math.evaluate(number);

    return result.toFixed(5);
  };

  this.getUnit = function(input) {
    var result;

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    var result;

    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    return result;
  };
}

module.exports = ConvertHandler;
