const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

// const password = bcrypt.hashSync("123456");
// const userData = [
//   { username: "andy", password, email: "andy@ggg.mail" },
//   { username: "bobby", password, email: "bobby@ggg.mail" },
//   { username: "candy", password, email: "candy@ggg.mail" },
// ];

const products = [
  { name: "", stock: k, picture: d, cost: d, description: d },
  { name: "", stock: k, picture: d, cost: d, description: d },
  { name: "", stock: k, picture: d, cost: d, description: d },
  { name: "", stock: k, picture: d, cost: d, description: d },
  { name: "", stock: k, picture: d, cost: d, description: d },
  { name: "", stock: k, picture: d, cost: d, description: d },
];

const run = async () => {
  //   await prisma.user.createMany({ data: userData });
  await prisma.product.createMany({ data: products });
};

run();
