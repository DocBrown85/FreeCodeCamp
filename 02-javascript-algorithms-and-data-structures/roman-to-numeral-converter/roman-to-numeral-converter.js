function convertToRoman(currentNumber) {

  let getDigitsFromNumeral = function(number) {

    let digits = [];

    let pow = 0;
    let currentNumber = number;
    while (currentNumber > 0) {
      digit = currentNumber % 10;
      digits.unshift(digit);
      pow++;
      currentNumber = Math.floor(number / Math.pow(10, pow));
    }

    return digits;

  };

  let getRomanFromDigits = function(numeralDigits) {

    let romanSymbolsMap = {
      1: 'I',
      5: 'V',
      10: 'X',
      50: 'L',
      100: 'C',
      500: 'D',
      1000: 'M'
    };

    return 'XXX';

  }

  let numeralDigits = getDigitsFromNumeral(currentNumber);
  console.log(numeralDigits);

  let roman = getRomanFromDigits(numeralDigits);
  console.log(roman);

  return roman;

}

convertToRoman(12309);
