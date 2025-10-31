import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../../Constants/RoutesConstants";
import logo from "../../../../Assets/logo.png"
import { useEffect, useState } from "react";
import type { AccountDTO } from "../../../../Types/Account";
import { AccountService } from "../../../../Services/AccountService";
import type { ApplicationError } from "../../../../Types/Error";
import NavLink from "../NavLink/NavLink";
import { useAuth } from "../../../../Hooks/AuthProvider";

function Header() {
    const [account, setAccount] = useState<AccountDTO | undefined>(undefined);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { logout, isAuthenticated } = useAuth();
    
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) return;

        setLoading(true);
        
        AccountService.getCurrent()
            .then(response => {
                setAccount(response);
            })
            .catch((error: ApplicationError) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [isAuthenticated])

    function redirectToHome() {
        navigate(ROUTES.HOME);
    }

    function handleLogout() {
        setLoading(true);

        AccountService.logout()
            .then(() => {
                logout();
                navigate(ROUTES.LOGIN);
            })
            .catch((error: ApplicationError) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

    return(
        <div className="bg-eerie-black border-b-1 border-floral-white py-4">
            <div className="flex justify-between max-w-screen-lg mx-auto px-5">
                <nav className="flex gap-10">
                    <img
                        src={logo}
                        alt="GSW Logo"
                        className="w-32 cursor-pointer"
                        onClick={redirectToHome}/>
                    <div className="flex items-center gap-4">
                        <NavLink
                            to={ROUTES.TESTING}
                            className="text-lg">
                                Browse
                        </NavLink>
                        <NavLink
                            to={ROUTES.TESTING}
                            className="text-lg">
                                Forum
                        </NavLink>
                        <NavLink
                            to={ROUTES.TESTING}
                            className="text-lg">
                                Contact us
                        </NavLink>
                    </div>
                </nav>
                <nav className="flex items-center gap-4">
                {isAuthenticated && account
                ?
                    <div className="flex gap-4">
                        <NavLink
                            to={ROUTES.TESTING}
                            className="text-lg">
                                {account.username}
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="text-lg border-b-2 hover:border-floral-white border-transparent">
                                Log out
                        </button>
                    </div>
                :
                    <div className="flex items-center gap-4">
                        <NavLink
                            to={ROUTES.REGISTER}
                            className="text-md">
                                Sign up
                        </NavLink>
                        <NavLink
                            to={ROUTES.LOGIN}
                            className="text-md">
                                Log in
                        </NavLink>
                    </div>
                }
                </nav>
            </div>
        </div>
    )
}

export default Header;