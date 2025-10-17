import type { ReactNode } from "react";
import { useAuth } from "../Hooks/AuthProvider";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../Constants/RoutesConstants";

function ProtectedRoute({children}: {children: ReactNode}) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to={ROUTES.LOGIN} replace></Navigate>
    }

    return <>{children}</>
}

export default ProtectedRoute;