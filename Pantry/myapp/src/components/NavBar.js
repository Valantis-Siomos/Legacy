import { Link, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import "../components/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  let token;
  let decoded;
  
  try {
  // Check if a token exists in local storage
  token = localStorage.getItem('token');
  decoded = jwtDecode(token);
  } catch (err) {
    console.log(err);
  }

    function handleLogout() {
      if (token) {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload()
      } else {
        return;
      }
    }

  return (
    <>    
    <h1 className="title">That's your Pantry</h1>   
    {!token ? ( 
      <nav className="navbar">
        <div className="linkGroup">
          
          <Link to="/" className="link">Home</Link>
          <Link to="/login" className="link">Log In</Link>
          <Link to="/register" className="link">Register</Link>
        </div>
      </nav>
     ) : (
        <nav className="navbar">
          <div className="linkGroup">
          
            <Link className="link">{decoded.email}</Link>
            <Link to="/" className="link">Home</Link>
            <Link to="/form" className="link">Create</Link>
            <Link onClick={handleLogout} className="link">Log Out</Link>
          </div>
        </nav> 
      )}
  </>
  );
}

export default Navbar;
