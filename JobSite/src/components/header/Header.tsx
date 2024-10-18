//import React from 'react'
import BcImage from "../../assets/Bethel College_signature_trimmed.png";
//import { useState } from 'react'
//import { googleLogout, useGoogleLogin } from "@react-oauth/google";
//import axios from 'axios';
import { Link } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
/*
interface User {
  access_token: string;
  // Add other properties if needed
}
*/
export const Header = () => {
  //const [ user, setUser ] = useState<User | null>(null); //figure out typing
  //const [ profile, setProfile ] = useState<any>(null);

  const { isLoggedIn, toggleLogIn } = useLogin();

  //put this log in stuff in some sort of context provider to tell if a user is logged in on any page
  /*
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  })
  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googlepapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
    
);

// log out function to log the user out of google and set the profile array to null
const logOut = () => {
    googleLogout();
    setProfile(null);
};
*/
  return (
    <div className="container p-3 flex items-center justify-start drop-shadow-md" id="header-container">
      <div className="px-3" id="logo-container">
      <img src={BcImage} className="w-28 md:w-48"></img>
      <h2 className="antialiased text-slate-600 text-center font-sans text-sm md:text-2xl font-bold">Careers</h2>
      </div>
      <div className="inline-flex bg-slate-100 rounded-full max-w-screen-sm justify-start p-3" id="navbar-container">
        <Link to="/" className="px-2 md:px-5 text-sm md:text-xl text-nowrap">Home</Link>
        <Link to="/apply" className="px-2 md:px-5 text-sm md:text-xl text-nowrap">Apply</Link>
        <Link to="https://www.bethelks.edu" className="px-2 md:px-5 text-sm md:text-xl text-nowrap">Main Site</Link>
        <button onClick={toggleLogIn}>
          {isLoggedIn ? 'Log out' : 'Log In'}
        </button>
      </div>
      <div className="ml-auto flex flex-col items-end">
        </div>
    </div>
      
    
  );
};
export default Header;
