import { useQuery } from "@tanstack/react-query";
import { AccountService } from "../../../Services/AccountService";

function Home() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['account'],
        queryFn: () => AccountService.get("tin4o")
    })

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    return(
        <div>
            <h1>Home</h1>
            <h2>{data?.username}</h2>
            <h2>{data?.email}</h2>
        </div>
    )
}

export default Home;