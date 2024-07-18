const productService = require("../service/productService");

const productController = {};
productController.getProduct = async (req, res, next) => {
  try {
    const result = await productService.getAllProduct();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

productController.updateProductStock = async (req, res, next) => {
  try {
    const { cartItem } = req.body;
    console.log(req.body);
    const result = cartItem.map(async (el) => await productService.updateStock(el.amount, el.product_id));
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
module.exports = productController;
