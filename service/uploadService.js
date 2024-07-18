const cloudinary = require("../config/cloudinary/cloudinary");
const uploadService = {};

uploadService.upload = async (path) => {
  const { secure_url } = await cloudinary.uploader.upload(path);
  return secure_url;
  //เเทนที่จะ return เป็น object ให้ return เป็น string
};

module.exports = uploadService;
