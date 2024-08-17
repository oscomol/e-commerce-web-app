function generateRandomString() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomString = '';
    for (var i = 0; i < 7; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }
    return randomString;
  }

module.exports = generateRandomString;
  