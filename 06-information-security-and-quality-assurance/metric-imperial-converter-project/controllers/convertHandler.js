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

    const unitOnlyInputRegex = /^[a-zA-Z]+$/;
    let match = input.match(unitOnlyInputRegex);
    if (match) {
      return 1;
    }

    const numberRegex = /^(\d+\.\d+|\d+)(\/(\d+\.\d+|\d+))*/;
    match = input.match(numberRegex);
    if (match === null) {
      return "invalid number";
    }
    const number = match[0];

    const result = math.evaluate(number);

    return result.toFixed(5);
  };

  this.getUnit = function(input) {
    if (!input) {
      return "invalid number and unit";
    }
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
    const outUnitSpellMappings = {
      km: "kilometers",
      mi: "miles",
      l: "liters",
      gal: "gallons",
      kg: "kilograms",
      lbs: "pounds"
    };
    return outUnitSpellMappings[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (this.getUnit(initUnit)) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
