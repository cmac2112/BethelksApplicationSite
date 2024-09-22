//import React from 'react'
import "./Header.css";
import BcImage from "../../assets/Bethel College_signature_trimmed.png";

export const Header = () => {

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="image-container">
          <img src={BcImage} alt="Bethel College Logo" height={40} />
          <h1 className="header-title">Careers</h1>
        </div>
        <div className="navbar-container">
          <div className="navbar">
            <a className="navbar-item" href="/">
              Careers Home
            </a>
            <a className="navbar-item" href="/apply">
              Apply
            </a>
            
          </div>
          
        </div>
        <div className="admin-login">
        <form className="form-class">
          <p>Administrative Login</p>
      <input className="username" type="text" placeholder="Username" />
      <input className="username" type="password" placeholder="Password" />
      <input type="submit" value="Login" />
      </form>
      </div>
      </div>
      
      </div>
    
  );
};
export default Header;
