import { useState } from "react";
import axios from "axios";
import "../components/form.css";

function Form({ getAllProducts }) {
    let token = localStorage.getItem("token");
    const [product, setProduct] = useState({
        name: "",
        expirationDate: Date,
        category: "",
    });

    function handleInputChange(e) {
        const value = e.target.value;
        setProduct({
            ...product, [e.target.name]: value,
        });
    }

    const addNewProduct = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/products/create", product, {headers:{Authorization:`Bearer ${token}`}})
        .then(() => { 
            getAllProducts();
        })
        .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="formContainer">
                <form onSubmit={(e) => {addNewProduct(e)}} className="form">
                    <label>Product Name</label><br/>
                    <input type="text" name="name" onChange={handleInputChange} value={product.name}/><br/>
                    <label>Expiration Date</label><br/>
                    <input type="date" name="expirationDate" onChange={handleInputChange} value={product.expirationDate}/><br/>
                    <label>Product Category</label><br/>
                    <input type="text" name="category" onChange={handleInputChange} value={product.category}/><br/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Form;