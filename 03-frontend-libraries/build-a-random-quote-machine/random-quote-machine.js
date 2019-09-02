;
var RandomQuoteMachine = (function() {

  var QUOTES_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
  var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

  var quotesData = {};

  var newQuote = null;
  var quoteText = null;
  var quoteAuthor = null;
  var body = null;
  var button = null;
  var tweetButton = null;
  var tumblrButton = null;

  function init() {

    newQuote = $("#new-quote");
    quoteText = $(".quote-text");
    quoteAuthor = $(".quote-author");
    body = $("html body");
    button = $(".button");
    tweetButton = $('#tweet-quote');
    tumblrButton = $('#tumblr-quote');

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
    newQuote.on("click", newQuoteButtonOnClick);
    displayNewQuote({
      displayQuoteOnly: true
    });
  }

  function newQuoteButtonOnClick() {
    displayNewQuote({
      displayQuoteOnly: false
    });
  }

  function displayNewQuote(opts) {
    var quote = getRandomQuote();
    displayQuote(quote);
    if (!opts.displayQuoteOnly) {
      updateSocialMediaLinks(quote);
      updateBackgroundColor();
    }
  }

  function displayQuote(aQuote) {
    quoteText.animate({
        opacity: 0
      },
      500,
      function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $('#text').text(aQuote.quote);
      }
    );

    quoteAuthor.animate({
        opacity: 0
      },
      500,
      function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $('#author').html(aQuote.author);
      }
    );
  }

  function updateBackgroundColor() {
    color = getNewColor();

    body.animate({
      backgroundColor: color,
      color: color
    }, 1000);

    button.animate({
      backgroundColor: color
    }, 1000);
  }

  function getNewColor() {
    var index = Math.floor(Math.random() * colors.length);
    var color = colors[index];
    return color;
  }

  function updateSocialMediaLinks(aQuote) {
    tweetButton.attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + aQuote.quote + '" ' + aQuote.author)
    );

    tumblrButton.attr(
      'href',
      'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(aQuote.author) +
      '&content=' +
      encodeURIComponent(aQuote.quote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );
  }

  $(document).ready(init);

})();