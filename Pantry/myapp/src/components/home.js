import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import PantryImg from "../assets/Pantry.jpg";

function Home() {
  return (
    <div className="body">
      <img className="img" src={PantryImg}></img>
      <div className="pantryText">
         <h1 className="welcome">WELCOME</h1>
         <p> <span><Link to="/login" className="linkLogIn">Log in </Link></span>to track your Pantry</p>
         <p> Or <span><Link to="/register" className="linkLogIn">Register</Link></span> to create your Pantry</p>
      </div>
    </div>
  );
}

export default Home;
