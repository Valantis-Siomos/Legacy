const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../Controllers/controller");

router.get("/", getAllProducts);
router.post("/create", verifyToken, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;