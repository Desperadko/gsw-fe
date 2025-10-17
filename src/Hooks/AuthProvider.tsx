import { createContext, useContext, useState, type ReactNode } from "react";
import { SESSION_STORAGE_CONSTANTS } from "../Constants/SessionStorageConstants";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!sessionStorage.getItem(SESSION_STORAGE_CONSTANTS.JWT)
    );

    function login(token: string) {
        sessionStorage.setItem(SESSION_STORAGE_CONSTANTS.JWT, token);
        setIsAuthenticated(true);
    }

    function logout() {
        sessionStorage.removeItem(SESSION_STORAGE_CONSTANTS.JWT);
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}