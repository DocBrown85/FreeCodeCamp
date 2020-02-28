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

    /*
    const numReg = /[\d./]+/g;
    // Input has no number, only a unit
    if (input.match(numReg) === null) return 1;

    // Strip input of valid/invalid units
    const unitRegex = /([^\d]+$)/;
    const numOrEq = input.replace(unitRegex, "");
    // console.log(input);

    const letterRegex = /[a-zA-Z]+/;
    // Input is something like '1a3lbs' or 'a4gal'
    if (numOrEq.match(letterRegex)) return "invalid number";

    const result = math.evaluate(numOrEq);
    */

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
