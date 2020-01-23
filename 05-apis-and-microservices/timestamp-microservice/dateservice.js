module.exports = {
  getDate: function(dateString) {
    var isUnixTimestampTest = /^[0-9]*$/i;
    var isISO8601DateTest = /^(?:[\+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[\.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[\.,]\d+)?)?(?:[zZ]|(?:[\+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/i;

    var dateArg = null;
    if (dateString != undefined) {
      var isUnixTimestamp = isUnixTimestampTest.test(dateString);
      if (isUnixTimestamp) {
        var unixTimestamp = Number.parseInt(dateString);
        dateArg = unixTimestamp;
      } else if (isISO8601DateTest.test(dateString)) {
        dateArg = dateString;
      } else {
        return {error: "Invalid Date"};
      }
    }

    var date = null;
    if (dateArg === null) {
      date = new Date();
    } else {
      date = new Date(dateArg);
      if (!(date instanceof Date && !isNaN(date))) {
        return {error: "Invalid Date Object"};
      }
    }

    var response = {unix: date.getTime(), utc: date.toUTCString()};
    return response;
  }
};
