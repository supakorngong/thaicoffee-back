const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Ensure the directory exists
const imageDirectory = path.join(__dirname, "public", "images");
// if not then create
if (!fs.existsSync(imageDirectory)) {
  fs.mkdirSync(imageDirectory, { recursive: true });
}
// ใช้ diskStorage กำหนดว่าไฟล์จะถูกเก็บไว้ใน imageDirectory
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imageDirectory);
  },
  filename: (req, file, callback) => {
    const filename = `${new Date().getTime()}${Math.round(Math.random() * 100000)}.${file.mimetype.split("/")[1]}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
