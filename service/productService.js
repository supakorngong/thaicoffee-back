const prisma = require("../model/prisma");
const createNewError = require("../utils/createError");

const productService = {};
productService.getAllProduct = async () => {
  try {
    const product = await prisma.product.findMany();
    return product;
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};
productService.updateStock = async (amounts, productId) => {
  try {
    const product = await prisma.product.update({
      where: {
        product_id: productId,
      },
      data: {
        stock: {
          increment: -amounts,
        },
      },
    });
    return product;
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};

module.exports = productService;
