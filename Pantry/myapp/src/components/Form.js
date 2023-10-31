import { useState } from "react";
import axios from "axios";
import "../components/form.css";
import { useNavigate } from "react-router-dom"



function Form({ getAllProducts }) {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [product, setProduct] = useState({
    name: "",
    expirationDate: "",   /*expirationDate: Date,     this here just destroy me.   The -->(Date)<--*/
    category: "",
  });
  
  function handleInputChange(e) {
    const value = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
  }
  //Not spaces not empty fields,Look up in function Form.....
  const notSpace = () => {
    return (
      product.name.trim() !== "" &&
      product.expirationDate.trim() !== "" &&
      product.category.trim() !== ""
    );
  };

  const addNewProduct = (e) => {
    e.preventDefault();
    if (!notSpace()) {
      alert("Please fill all Fields");
      return;
    }
    axios
      .post("https://pantry-3333.onrender.com/products/create", product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getAllProducts();
        navigate("/products")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="formContainer">
        <form
          onSubmit={(e) => {
            addNewProduct(e);
          }}
          className="form"
        >
          <label>Product Name</label>
          <br />
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={product.name}
          />
          <br />
          <label>Expiration Date</label>
          <br />
          <input
            type="date"
            name="expirationDate"
            onChange={handleInputChange}
            value={product.expirationDate}
          />
          <br />
          <label>Product Category</label>
          <br />
          <input
            type="text"
            name="category"
            onChange={handleInputChange}
            value={product.category}
          />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
