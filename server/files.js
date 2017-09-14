var fs = require('fs');
const path = require('path');

function copy(old,newf,repl) {
  var r = (typeof(repl) == 'boolean')? repl : true;
fs.exists(old,function (exist) {
  if( exist && r ){
    fs.createReadStream(old).pipe(fs.createWriteStream(newf));
  }
})
}


function save(fileName, content, callback) {
  fs.mkdir(path.join(__dirname, './storage'), function(e) {
    var filePath = path.join(__dirname, './storage/') + fileName;
    fs.writeFile(filePath, content, function(err) {
      if (err) {
        callback(err, content, filePath)
        return;
      }
      callback(null, content, filePath)
    });
  })
}
// save('piska.variable','5',function (err, content,fp) {
//   console.log(err,content,fp);
// })
function read(fileName, callback) {
  var filePath = path.join(__dirname, './storage/') + fileName;
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      callback(err, null, null);
      return;
    }
    callback(null, data, filePath);
  });
}
// read('piska.variable',function (err, content, path) {
//   console.log(err, content, path)
// })

module.exports.copy = copy;
module.exports.save = save;
module.exports.read = read;
