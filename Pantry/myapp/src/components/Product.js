import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../components/product.css";

function Product({ getAllProducts, products }) {
  const [creatorIds, setCreatorIds] = useState([]);
  let token = localStorage.getItem("token");
  const decoded = token ? jwt_decode(token) : null;

  useEffect(() => {
    if (decoded) {
      function filtered() {
        let updateCreatorIds = products
          .filter((p) => p.owner._id === decoded.id)
          .map((p) => p._id);
        setCreatorIds(updateCreatorIds);
      }
      filtered();
    }
  }, [products]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    expirationDate: Date,
    category: "",
  });

  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    expirationDate: new Date().toISOString().split("T")[0],
    category: "",
  });

  async function deleteProduct(id) {
    const alertDeleteProduct = window.confirm("are you sure?");
    if (alertDeleteProduct) {
      try {
        await axios.delete(`http://localhost:8000/products/${id}`);
      } catch (error) {
        console.log("Error deleting product:", error);
      }
      getAllProducts();
    }
  }

  // async function addProduct() {
  //   try {
  //     await axios.post("http://localhost:8000/products", newProduct);
  //     setNewProduct({
  //       name: "",
  //       expirationDate: "",
  //       category: ""
  //     });
  //     getAllProducts();
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // }

  async function updateProduct() {
    try {
      await axios.put(`http://localhost:8000/products/${editProduct.id}`, {
        name: editProduct.name,
        expirationDate: editProduct.expirationDate,
        category: editProduct.category,
      });
      setEditProduct({
        id: null,
        name: "",
        expirationDate: "",
        category: "",
      });
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div>
      {/* Render Existing Products */}
      {products.map((product) => {
        if (creatorIds.includes(product._id)) {
          return (
            <div key={product._id} className="productCard">
              <div className="product">
                <label>Product:</label>
                <span>{product.name}</span>
                <label>Expired Date:</label>
                <span>
                  {new Date(product.expirationDate).toLocaleDateString()}
                </span>
                <label>Category:</label>
                <span>{product.category}</span>
                <div className="buttonsContainer">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="deleteButton"
                  >
                    <i className="material-icons">Delete</i>
                  </button>
                  <button
                    onClick={() => {
                      setEditProduct({
                        id: product._id,
                        name: product.name,
                        expirationDate: product.expirationDate,
                        category: product.category,
                      });
                    }}
                    className="editButton"
                  >
                    <i className="material-icons">Edit</i>
                  </button>
                </div>
              </div>

              {/* Render the text as editable input if currently being edited */}
              {editProduct.id === product._id && (
                <div className="editForm">
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editProduct.expirationDate.split("T")[0]}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        expirationDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                      })
                    }
                  />
                  <button onClick={updateProduct}>Save</button>
                </div>
              )}
            </div>
          );
        }
        return null; // Skip rendering if the user doesn't own the product
      })}
    </div>
  );
}

export default Product;
