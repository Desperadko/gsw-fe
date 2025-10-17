import { useQuery } from "@tanstack/react-query";
import { AccountService } from "../../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/AuthProvider";

function Home() {
    const { logout } = useAuth();

    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['account'],
        queryFn: () => AccountService.get("tin4o")
    })

    function handleLogout() {
        logout();
        navigate("/login");
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    return(
        <div>
            <h1>Home</h1>
            <h2>{data?.username}</h2>
            <h2>{data?.email}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;