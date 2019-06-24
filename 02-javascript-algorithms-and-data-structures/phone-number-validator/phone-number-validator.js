function telephoneCheck(str) {
  let regex = /^(1){0,1}( |)(\(\d{3}\)|\d{3})(-| |){0,1}(\d){3}(-| |){0,1}(\d){4}$/g;
  let isValid = regex.test(str);

  return isValid;
}

telephoneCheck("555-555-5555");
