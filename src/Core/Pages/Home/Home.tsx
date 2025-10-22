import { AccountService } from "../../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/AuthProvider";
import { ROUTES } from "../../../Constants/RoutesConstants";
import { useEffect, useState } from "react";
import type { AccountDTO } from "../../../Types/Account";
import type { ApplicationError } from "../../../Types/Error";

function Home() {
    const [account, setAccount] = useState<AccountDTO | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const getCurrentAccount = async () => {
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
        }

        getCurrentAccount();
    }, [])

    function handleLogout() {
        AccountService.logout()
            .then(response => {
                console.log(response.message)
            })
        logout();
        navigate(ROUTES.LOGIN);
    }

    if(loading) return <div>Loading...</div>

    return(
        <div>
            <h1>Home</h1>
            <h2>{account?.username}</h2>
            <h2>{account?.email}</h2>
            {error && (
                <p>{error}</p>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;