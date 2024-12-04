//import React from 'react'
import BcImage from "../../assets/Bethel College_signature_trimmed.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/LoginContext";
export const Header = () => {
  //const [ user, setUser ] = useState<User | null>(null); //figure out typing
  //const [ profile, setProfile ] = useState<any>(null);

  const { isLoggedIn, login, logout, userInfo } = useAuth();
  return (
    <div className="container p-3 flex items-center justify-start drop-shadow-md" id="header-container">
      <div className="px-3" id="logo-container">
      <img src={BcImage} className="w-28 md:w-48"></img>
      <h2 className="antialiased text-slate-600 text-center font-sans text-sm md:text-2xl font-bold">Careers</h2>
      </div>
      <div className="flex justify-between">
      <div className="inline-flex bg-slate-100 rounded-full max-w-screen-sm justify-start p-3" id="navbar-container">
        <Link to="/" className="px-2 md:px-5 text-sm md:text-xl text-nowrap">Home</Link>
        <Link to="/apply" className="px-2 md:px-5 text-sm md:text-xl text-nowrap">Apply</Link>
        <Link to="https://www.bethelks.edu" className="px-2 md:px-5 text-sm md:text-xl text-nowrap">Main Site</Link>
      </div>
      </div>
      <div className="ml-auto flex items-end px-2">

      <button className="p-2" onClick={isLoggedIn ? logout : login}>
          {isLoggedIn ? 'Log out' : ''}
        </button>
      {isLoggedIn && (
        <p className="p-2">Hello, {userInfo?.name || localStorage.getItem('name')}</p>
      )}
      
        </div>
    </div>
      
    
  );
};
export default Header;
