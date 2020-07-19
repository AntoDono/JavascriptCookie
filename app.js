var express = require('express');
var cookieParser = require('cookie-parser');
var aesjs = require('aes-js');

// Key to decrypt & encrypt, change the keys to make it harder to decrypt
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

var app = express();
app.use(cookieParser());

app.get('/', function(req, resp) {
  //encyrpt here
  var theinfo = 'Password'
  let textBytes = aesjs.utils.utf8.toBytes(theinfo);

  var counter = new aesjs.ModeOfOperation.ctr(key);
  var encryptedBytes = counter.encrypt(textBytes);

  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  //creates cookie
  resp.cookie('WEB_LOGIN',encryptedHex);

  //decrypts, remove if needed
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)

  var counter2 = new aesjs.ModeOfOperation.ctr(key);
  var decryptedBytes = counter2.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)

  console.log(decryptedText)

  resp.end('Connected')
});

app.listen(8888, function() {
  console.log('Listening')
});
