/*
if (Meteor.isServer) {
  var fs = Npm.require('fs');
  var filename = "mini$tests/empty";

  require('readline').createInterface({
    input: fs.createReadStream(filename),
    terminal: false
  }).on('line', function (line) {
    console.log('Line: ' + line);
  });
}
*/