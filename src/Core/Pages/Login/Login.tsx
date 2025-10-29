import { useState } from "react";
import { AccountService } from "../../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import type { ApplicationError } from "../../../Types/Error";
import { useAuth } from "../../../Hooks/AuthProvider";
import { ROUTES } from "../../../Constants/RoutesConstants";

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>({});

    const { login } = useAuth();

    const navigate = useNavigate();

    function handleLogin() {
        setLoading(true);

        AccountService.login({username, password})
        .then(response => {
            login(response.token);
            navigate(ROUTES.HOME);
        })
        .catch((error: ApplicationError) => {
            setError(error.message);
            setErrors(error.details);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    function redirectToRegister() {
        navigate(ROUTES.REGISTER);
    }
    
    if(loading) return <div>Loading...</div>

    return(
        <div className="flex justify-around items-center">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"/>
            {errors && errors.Username && (
                <p>{errors.Username}</p>
            )}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"/>
            {errors && errors.Password && (
                <p>{errors.Password}</p>
            )}
            {error && !error.includes("validation") && (
                <p className="mt-2">{error}</p>
            )}
            <button className="" onClick={handleLogin}>Submit</button>
            <button onClick={redirectToRegister}>Don't have an account?</button>
        </div>
    );
}

export default Login;