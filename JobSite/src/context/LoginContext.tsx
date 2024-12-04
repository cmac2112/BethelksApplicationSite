import {useState, createContext, useEffect, useContext } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
interface userInfo {
    name: string;
    email: string;
    picture: string;
    sub: string;
    given_name: string;
    family_name: string;
    hd: string;
}
interface LoggedInContextType {
    isLoggedIn?: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userInfo?: userInfo | null;
    login?: () => void;
    logout?: () => void;
    updateUserProfile?: () => Promise<any>;
    errorMessage: string;
    setErrorMessage:(errorMessage: string) => void;
}

const AuthContext = createContext<LoggedInContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface LoggedInProviderProps {
    children: React.ReactNode;
}

//only authorized users should be able to access certain routes and parts of the site
//maybe make another table with default authorized users and allow someone to add or remove authorized users in the configure page

export const AuthProvider: React.FC<LoggedInProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<userInfo | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const login = useGoogleLogin({
        scope: "openid profile email",
        onSuccess: async (tokenResponse) => {
            console.log('Login Success, checking validity status:', tokenResponse);
            const { access_token} = tokenResponse;
            console.log('Access Token:', access_token);
            
            localStorage.setItem('authToken', tokenResponse.access_token)
            // Fetch user information from Google's UserInfo API
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${tokenResponse.access_token}`
                }
            });
            const userInfoData = await userInfoResponse.json();
            setUserInfo(userInfoData);
            console.log('User Info:', userInfoData);
            try {
                const response = await fetch(`http://${import.meta.env.VITE_HOST}:3000/api/authorized/${userInfoData.email}`);
                if (!response.ok) {
                  // Log the response text if it's not JSON
                  const text = await response.text();
                  console.error('Error response:', text);
                  throw new Error('Failed to fetch authorized user info');
                }
                //const data = await response.json();
                if(userInfo){
                localStorage.setItem('name', userInfo.name)
                }else{
                    localStorage.getItem('name')
                }
                setIsLoggedIn(true)
              } catch (err) {
                console.error('Error fetching authorized user info:', err);
                setIsLoggedIn(false)
                setUserInfo(null)
                
              }
            console.log('skipped')
            //must handle token forging on backend when the application is built
            // if a user enters a random string of letters and numbers to the authToken field
            // in local storage, they can fool the code in showing that they are logged in and seeing home posts
            //but they wont be able to do anything
            
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            setIsLoggedIn(false);
        },
    });

    const logout = () => {
        googleLogout();
        setIsLoggedIn(false);
        setUserInfo(null);
        localStorage.removeItem('authToken');
        console.log('Logout Success');
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
        
    }, []);
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, login, logout, errorMessage, setErrorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};
