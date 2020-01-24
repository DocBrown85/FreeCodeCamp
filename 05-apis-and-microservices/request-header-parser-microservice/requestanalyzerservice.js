module.exports = {
  getClientInfo: function(request) {
    return new Promise(function(resolve, reject) {
      var clientInfo = {
        ipaddress: null,
        language: null,
        software: null
      };

      clientInfo.ipaddress = request.get("host");
      clientInfo.language = request.get("Accept-Language");
      clientInfo.software = request.get("User-Agent");

      resolve(clientInfo);
    });
  }
};
