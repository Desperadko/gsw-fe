import type { ReactNode } from "react";
import { useAuth } from "../Hooks/AuthProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}: {children: ReactNode}) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/login" replace></Navigate>
    }

    return <>{children}</>
}

export default ProtectedRoute;