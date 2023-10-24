const Product = require("../Models/model");

const getAllProducts = async(req, res) => {
    try {
        const allProducts = await Product.find();
        res.send(allProducts);        
    } catch (err) {
        res.status(500).json({msg: "Failed to retrieve products."});
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await Product.create(newProduct);
        res.send(createdProduct);        
    } catch (err) {
        res.status(500).json({msg: "Failed to create product."});
    }
};

const updateProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const id = req.params.id;
        await Product.updateOne({_id: id}, newProduct);
        res.send("Product edited");        
    } catch (err) {
        res.status(500).json({msg: "Failed to edit product."});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        res.send("Product deleted.");        
    } catch (err) {
        res.status(500).json({msg: "Failed to delete product."});
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };