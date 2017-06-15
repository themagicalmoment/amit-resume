var express = require("express"),
app = express(),
path = require('path'),
fs = require('fs'),
http = require('http'),
mime = require('mime');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/static', express.static('public'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/download', function(req, res, next){
  var file = __dirname + '/files/samplefile.docx';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  console.log("mimetype:"+ mimetype);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
  /*res.send(200,{
      isError:false,
      message: "File downloaded!"
  })*/
});

app.get('/email', function(req,res,next){

});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;