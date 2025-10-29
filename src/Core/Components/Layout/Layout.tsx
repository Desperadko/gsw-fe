import { Outlet } from "react-router-dom";
import { useAuth } from "../../../Hooks/AuthProvider";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function Layout() {
    const {isAuthenticated} = useAuth();
    
    return (
        <>
            <Header authenticated = {isAuthenticated}/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;