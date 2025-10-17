import { useState } from "react";
import { AccountService } from "../../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import type { ApplicationError } from "../../../Types/Error";
import { useAuth } from "../../../Hooks/AuthProvider";

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
            setLoading(false);
            navigate("/");
        })
        .catch((error: ApplicationError) => {
            setLoading(false);
            setError(error.message);
            setErrors(error.details);
        })
    }

    function redirectToRegister() {
        navigate("/register");
    }
    
    if(loading) return <div>Loading...</div>

    return(
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"/>
            {errors && errors.Username && (
                <p>{errors.Username}</p>
            )}
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"/>
            {errors && errors.Password && (
                <p>{errors.Password}</p>
            )}
            {error && !error.includes("validation") && (
                <p className="mt-2">{error}</p>
            )}
            <button onClick={handleLogin}>Submit</button>
            <button onClick={redirectToRegister}>Don't have an account?</button>
        </div>
    );
}

export default Login;