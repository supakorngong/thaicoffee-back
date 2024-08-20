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

userService.findUserById = (id) => {
  return prisma.user.findUnique({
    where: {
      user_id: id,
    },
  });
};

userService.updateAddressById = (id, address) => {
  console.log("ofkepfpekpfepfepfepfpe", id, address);
  return prisma.user.update({
    where: {
      user_id: id,
    },
    data: {
      address: address,
    },
  });
};
module.exports = userService;
