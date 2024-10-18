//hold context for a logged in user here
import React, { createContext, useContext } from "react";

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

    const toggleLogIn = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    return(
        <LoginContext.Provider value={{ setIsLoggedIn, isLoggedIn, toggleLogIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)