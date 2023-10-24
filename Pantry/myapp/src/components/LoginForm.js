import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../components/form.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // let decoded;
    // let token;

    async function handleLogin(e) {
        try {
            e.preventDefault();
            let res = await axios.post("http://localhost:8000/products/login", { email, password });
            console.log(res.data);
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        } catch (err) {
            alert("Log in failed, check your email or password.");
        }  
    }
        // decoded = jwt_decode(token);
        // console.log(decoded.email);

    return (
        <div className="formContainer">
            <form onSubmit={handleLogin} value="LogInForm" className="form">
                <h2>Log in</h2><br/>
                <label>Email</label><br/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <label>Password</label><br/>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <input type="submit" value="Log in"/>
            </form>
        </div>
    );
}

export default Login;