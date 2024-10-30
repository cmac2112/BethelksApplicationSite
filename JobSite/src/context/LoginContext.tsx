//hold context for a logged in user here
import React, { createContext, useContext, useEffect } from "react";

interface LoggedInContextType{
    isLoggedIn?: boolean;
    setIsLoggedIn: (isloggedIn: boolean) => void;
    toggleLogIn: () => void;
}

export const LoginContext = createContext<LoggedInContextType>({
    isLoggedIn: false,
    setIsLoggedIn: ()=> {},
    toggleLogIn: () => {},
})


interface LoggedInProivderProps{
    children: React.ReactNode
}

export const LoggedInProvider: React.FC<LoggedInProivderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        if(token){
            setIsLoggedIn(true);
        }
    }, [])
    const toggleLogIn = () => {
        if(isLoggedIn){
            localStorage.removeItem('authToken')
        }else{
            localStorage.setItem('authToken', 'testToken')
        }
        setIsLoggedIn(!isLoggedIn)
    }

    return(
        <LoginContext.Provider value={{ setIsLoggedIn, isLoggedIn, toggleLogIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) {
      throw new Error('useLogin must be used within a LoggedInProvider');
    }
    return context;
  };