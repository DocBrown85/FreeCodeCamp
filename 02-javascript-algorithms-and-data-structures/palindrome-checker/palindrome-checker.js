function palindrome(str) {
  let res = str.replace(/[^a-z0-9]+/gi, "").toLowerCase();

  let isPalindrome = function(word, s, e) {
    if (s == e) {
      return true;
    }

    if (word[s] != word[e]) {
      return false
    }

    if (s < e + 1) {
        return isPalindrome(word, s + 1, e - 1);
    }

    return true
  };

  return isPalindrome(res, 0, res.length - 1);

}

palindrome("A man, a plan, a canal. Panama");
