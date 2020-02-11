const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const allowedImageMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif"
];

let uploadedImageName = "";

var storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      uploadedImageName = raw.toString("hex") + path.extname(file.originalname);
      cb(null, uploadedImageName);
    });
  }
});

// max 10MB
const upload = multer({
  dest: "public/images",
  limits: 10 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    cb(null, allowedImageMimeTypes.includes(file.mimetype));
  },
  storage: storage
});

router.post("/upload", upload.single("picture"), (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    res.status(200).render({image_path: uploadedImageName });
});
  
module.exports = router;