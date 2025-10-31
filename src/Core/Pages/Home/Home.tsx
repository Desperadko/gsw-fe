import { AccountService } from "../../../Services/AccountService";
import { useAuth } from "../../../Hooks/AuthProvider";
import { useEffect, useState } from "react";
import type { AccountDTO } from "../../../Types/Account";
import type { ApplicationError } from "../../../Types/Error";

function Home() {
    const [account, setAccount] = useState<AccountDTO | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { isAuthenticated } = useAuth();

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

    if(loading) return <div>Loading...</div>

    return(
        <div>
            <h1>Home</h1>
            <h2>{account?.username}</h2>
            <h2>{account?.email}</h2>
            {error && (
                <p>{error}</p>
            )}
        </div>
    )
}

export default Home;