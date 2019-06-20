function rot13(str) { // LBH QVQ VG!

  let CaesarCipher = function(_key) {

      let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

      let key = _key;

      this.encode = function(letter) {
          let encodedLetterIndex = (alphabet.indexOf(letter) + key) % alphabet.length;
          return alphabet[encodedLetterIndex];
      };

      this.decode = function(letter) {
          let decodedLetterIndex = (alphabet.indexOf(letter) - key + alphabet.length) % alphabet.length;
          return alphabet[decodedLetterIndex];
      };
  }

  let key = 13;
  let caesarCipher = new CaesarCipher(key);

  let characters = str.split("");
  let decodedCharacters = characters.map((item) => {
      let isAlphanumericRegex = /[a-z0-9]+$/i;
      if (isAlphanumericRegex.test(item)) {
          return caesarCipher.decode(item);
      }
      else {
          return item;
      }
  });

  let result = decodedCharacters.join("");

  return result;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));
