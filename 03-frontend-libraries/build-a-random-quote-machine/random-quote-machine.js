;
var RandomQuoteMachine = (function() {

  var QUOTES_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

  var quotesData = {};

  function init() {
    console.log("init");
    getQuotes().then(initUI);
  }

  function getQuotes() {
    return $.getJSON(QUOTES_URL, function(data) {
      quotesData = data;
    });
  }

  function getRandomQuote() {
    var randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    return randomQuote;
  }

  function initUI() {
    $("#new-quote").on("click", newQuoteButtonOnClick);
    displayNewQuote();
  }

  function newQuoteButtonOnClick() {
    displayNewQuote();
  }

  function displayNewQuote() {
    var quote = getRandomQuote();
    displayQuote(quote);
  }

  function displayQuote(aQuote) {
    $('#text').text(aQuote.quote);
    $('#author').html(aQuote.author);
  }

  $(document).ready(init);

})();