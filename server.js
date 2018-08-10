var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin: http://localhost:4202");
  res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
  res.header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With, X-CLIENT-ID, X-CLIENT-SECRET');
  res.header('Access-Control-Allow-Credentials: true');
  next();
});
var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post("/upload", upload.array("uploads[]",12), function (req, res) {
  console.log('files:', req.files);
  res.send(req.files);
});
 app.listen(3010, function () {
  console.log("Listening on port %s...", 3010);
});
