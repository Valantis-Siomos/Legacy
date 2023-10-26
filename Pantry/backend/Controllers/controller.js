const Product = require("../Models/model");
const User = require("../Models/UserModel");
const verifyToken = require("../Middleware/auth")


const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().populate("owner", "email");
    res.send(allProducts);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Failed to retrieve products bro what is that? XD." });
  }
};

const createProduct = async (req, res) => {
  try {
    let owner = req.user.id;
    let { name, expirationDate, category } = req.body;
    let newProduct = {
      name,
      expirationDate,
      category,
      owner,
    };
    const createdProduct = await Product.create(newProduct);
    res.send(createdProduct);
  } catch (err) {
    res.status(500).send({ msg: "Failed to create product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, newProduct);
    res.send("Product edited");
  } catch (err) {
    res.status(500).send({ msg: "Failed to edit product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.send("Product deleted.");
  } catch (err) {
    res.status(500).send({ msg: "Failed to delete product." });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
