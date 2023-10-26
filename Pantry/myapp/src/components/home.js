import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import PantryImg from "../assets/Pantry.jpg";

function Home() {
  return (
    <div className="body">
      <img className="img" src={PantryImg}></img>
    </div>
  );
}

export default Home;
