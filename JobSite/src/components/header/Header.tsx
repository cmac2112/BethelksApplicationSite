//import React from 'react'
import "./Header.css";
import BcImage from "../../assets/Bethel College_signature_trimmed.png";
import { useState, useEffect } from 'react'
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
interface User {
  access_token: string;
  // Add other properties if needed
}

export const Header = () => {
  const [ user, setUser ] = useState<User | null>(null); //figure out typing
  const [ profile, setProfile ] = useState<any>(null);
  console.log(user)
  console.log(profile)

  //put this log in stuff in some sort of context provider to tell if a user is logged in on any page
  
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
        {profile ? (<button onClick={()=>logOut()} className="google-login">Logout</button>)
        : 
        (<button className="google-login" onClick={() => login()}>Adminstrator Login</button>)}
      </div>
      </div>
      
      
    
  );
};
export default Header;
