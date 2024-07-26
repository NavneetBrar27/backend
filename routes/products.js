const express = require("express");
const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  updateProductPrice,
  getLikes
} = require("../Controllers/productControllers");

const router = express.Router();

//get all 
router.get("/", getProducts);

//GET a single product
router.get("/:id", getProduct);

//POST new product
router.post("/", createProduct);

//delete
router.delete("/:id", deleteProduct);

//update
router.put("/:id", updateProduct);

//update price
router.patch("/:id", updateProductPrice)

//update likes
router.patch("/:id/like", getLikes)

module.exports = router;
