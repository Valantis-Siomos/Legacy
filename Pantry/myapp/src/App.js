import Form from "./components/Form";
import Login from "./components/LoginForm";
import Register from "./components/SignUpForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import Home from "./components/home";

function App() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      await axios
        .get("http://localhost:8000/products")
        .then((res) => setProducts(res.data));
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
        <Route path="/" element = {<Home /> }/>
        <Route path="/form" element={<Form getAllProducts={getAllProducts} />}/>
        <Route path="/products" element={<ProductList products={products} getAllProducts={getAllProducts} />}/> 
        <Route path="/login" element={<Login login={Login}/>} />
        <Route path="/register" element={<Register register={Register} />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
