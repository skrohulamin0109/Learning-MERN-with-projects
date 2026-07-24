import react, { useContext, createContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({children}) => {
    const isLoggedInState = localStorage.getItem('isLoggedInState') === 'true';
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInState);
    const [loginMsg, setLoginMsg] = useState('')
    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginMsg, setLoginMsg }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

// Custom hook to make using the context easier across components
export function useAuth() {
    return useContext(AuthContext);
}
