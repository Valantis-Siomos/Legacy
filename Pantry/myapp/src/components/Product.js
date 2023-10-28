import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../components/product.css";
import { Link } from "react-router-dom";


function Product({ getAllProducts, products }) {
  const [creatorIds, setCreatorIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const token = localStorage.getItem("token");
  const decoded = token ? jwt_decode(token) : null;

  useEffect(() => {
    if (decoded) {
      function filterProductsByOwner() {
        const updateCreatorIds = products
          .filter((p) => p.owner._id === decoded.id)
          .map((p) => p._id);
        setCreatorIds(updateCreatorIds);
      }
      filterProductsByOwner();
    }
  }, [products]);

  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    expirationDate: "",
    category: "",
  });

  async function deleteProduct(id) {
    const alertDeleteProduct = window.confirm("Are you sure?");
    if (alertDeleteProduct) {
      try {
        await axios.delete(`http://localhost:8000/products/${id}`);
        getAllProducts();
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    }
  }

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

  // lowerCase save us!!
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="item-table-div" >
      <div className="searchdiv">
        <input
        id="searchInput"
          type="text"
          placeholder="Search your product here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {creatorIds.length === 0 ? (
        <p>Please click <Link to="/form" className="linko">here</Link> to add an item.</p>
      ) : (
        <table className="productTable">
          <thead>
            <tr>
              <th>Product</th>
              <th>Expired Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              if (creatorIds.includes(product._id)) {
                return (
                  <tr key={product._id}>
                    <td>
                      {editProduct.id === product._id ? (
                        <input
                          type="text"
                          value={editProduct.name}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td>
                      {editProduct.id === product._id ? (
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
                      ) : (
                        new Date(product.expirationDate).toLocaleDateString()
                      )}
                    </td>
                    <td>
                      {editProduct.id === product._id ? (
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
                      ) : (
                        product.category
                      )}
                    </td>
                    <td>
                      {editProduct.id === product._id ? (
                        <button onClick={updateProduct}>Save</button>
                      ) : (
                        <>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="deleteButton"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              setEditProduct({
                                id: product._id,
                                name: product.name,
                                expirationDate: product.expirationDate,
                                category: product.category,
                              })
                            }
                            className="editButton"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              }
              return null; // Skip rendering if the user doesn't own the product
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Product;