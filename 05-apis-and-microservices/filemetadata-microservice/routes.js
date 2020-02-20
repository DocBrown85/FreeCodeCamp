const express = require("express");
const routes = express.Router();

const multer = require("multer");
// set up the upload method from the multer package
// a single file will be uploaded
// the input element has a `type`of `file` and a `name` of `upfile`
const singleFileUpload = multer().single("upfile");

const FileMetadataMicroservice = require(__dirname +
  "/file-metadata-microservice.js");

routes.use(express.static("public"));
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

routes.post("/api/fileanalyse", singleFileUpload, (req, res) => {
  if (req.file) {
    const file = req.file;
    FileMetadataMicroservice.getFileMetadata(file)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.send(error);
      });
  } else {
    res.status(422).json({errors: ["missing required file"]});
  }
});

module.exports = routes;
