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
    const supportedUnits = ["gal", "l", "mi", "km", "lbs", "kg", "L"];

    let unitCandidateRegex = /[a-zA-Z]+$/;
    let match = input.match(unitCandidateRegex);
    if (!match) {
      return "no unit";
    }
    let unit = match[0].toLowerCase();

    if (supportedUnits.indexOf(unit) === -1) {
      return "invalid unit";
    }
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const validUnitMappings = {
      gal: "l",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    };
    return validUnitMappings[initUnit.toLowerCase()];
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
