function convertToRoman(currentNumber) {

  let romanSymbolsMap = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
  };

  let getDigits = function(number) {

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

  return getDigits(currentNumber);

}

console.log(convertToRoman(12309));
