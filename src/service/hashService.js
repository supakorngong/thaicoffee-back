const bcrypt = require("bcryptjs");
const hashService = {};

hashService.hash = async (plainText) => {
  return await bcrypt.hash(plainText, 10);
};

hashService.compare = async (plainText, hashValue) => {
  return bcrypt.compare(plainText, hashValue);
};

module.exports = hashService;
