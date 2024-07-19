const multer = require("multer");
// const storage = multer.memoryStorage();
//des = ปลายทางที่เก็บ  filename ชื่อที่เก็บ

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },
  filename: (req, file, callback) => {
    // console.log(file); //ถ้าเป็น single จะได้เป็น object อย่างเดียว log เพื่อดูหน้าตา ของ file ที่ upload
    console.log(file);
    console.log("%%%%%%%%%%");
    //ชื่ออะไรก็ได้ เเต่ตั้งเเบบนี้เพื่อให้มันไม่ซํ้ากัน
    const filename = `${new Date().getTime()}${Math.round(Math.random() * 100000)}.${file.mimetype.split("/")[1]}`;

    callback(null, filename);
  },
});

//กําหนด option ให้ multer
const upload = multer({ storage });
module.exports = upload;
