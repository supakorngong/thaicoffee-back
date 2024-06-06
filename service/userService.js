const prisma = require("../model/prisma");

const userService = {};
userService.createUser = (data) => {
  return prisma.user.create({ data });
};

userService.findUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

module.exports = userService;
