function convertToRoman(num) {

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
    while ((Math.floor(number / Math.pow(10, pow))) > 0) {
      digit = (Math.floor(number / Math.pow(10, pow)) % 10);
      digits.unshift(digit);
      pow++;
    }

    return digits;

  };

  return getDigits(num);

}

console.log(convertToRoman(1234));
