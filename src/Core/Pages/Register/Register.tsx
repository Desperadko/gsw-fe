import { useState } from "react";
import { AccountService } from "../../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import type { ApplicationError } from "../../../Types/Error";
import { useAuth } from "../../../Hooks/AuthProvider";
import { ROUTES } from "../../../Constants/RoutesConstants";

function Register() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>({});

    const { login } = useAuth();

    const navigate = useNavigate();

    function handleRegister() {
        setLoading(true);

        AccountService
        .register({ username, email, password })
        .then(response => {
            login(response.token)
            navigate(ROUTES.HOME);
        })
        .catch((error: ApplicationError) => {
            setError(error.message);
            setErrors(error.details);
        })
        .finally(() => {
            setLoading(false);
        })
    };

    function redirectToLogin() {
        navigate(ROUTES.LOGIN);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"/>
            {errors && errors.Email && (
                <p>{errors.Email}</p>
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
            <button onClick={handleRegister}>Submit</button>
            <button onClick={redirectToLogin}>Already have an account?</button>
        </div>
    );
}

export default Register;