import { useState } from "react";
import { AccountService } from "../../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import type { ApplicationError } from "../../../Types/Error";
import { useAuth } from "../../../Hooks/AuthProvider";
import { ROUTES } from "../../../Constants/RoutesConstants";
import logo from "../../../Assets/logo.png"
import { useErrorHandler } from "../../../Hooks/useErrorHandler";

function Login() {
    const fieldNames: string[] = ["username", "password"];

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const {errors, processError, clearErrors} = useErrorHandler();

    const { login } = useAuth();

    const navigate = useNavigate();

    function handleLogin() {
        setLoading(true);

        clearErrors(fieldNames);

        AccountService.login({credentials: {username, password}})
        .then(response => {
            login(response.token);
            navigate(ROUTES.HOME);
        })
        .catch((error: ApplicationError) => {
            processError(error, fieldNames)
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
        <div
            className="
                flex flex-col justify-center items-center
                bg-eerie-black
                max-w-150
                sm:mx-auto mx-5 my-10">
            <img
                src={logo}
                alt="GSW Logo"
                className="border-b-1 border-b-floral-white"/>
            <div className="flex flex-col justify-center items-center gap-6 my-10">
                <h1
                    className="
                        text-2xl text-floral-white font-bold">
                    Log in
                </h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="
                            text-floral-white
                            border-b-1 border-floral-white
                            p-2"/>
                    {errors && errors.username && (
                        <p className="text-red-500 font-semibold">
                            {errors.username}
                        </p>
                    )}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="
                            text-floral-white
                            border-b-1 border-floral-white
                            p-2"/>
                    {errors && errors.password && (
                        <p className="text-red-500 font-semibold">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="flex justify-center items-center flex-col gap-4">
                    <button
                        onClick={handleLogin}
                        className="
                            bg-flame hover:bg-floral-white
                            text-floral-white hover:text-flame
                            font-semibold hover:font-bold
                            rounded-2xl px-15 py-1
                            transition duration-100">
                            Submit
                    </button>
                    <button
                        onClick={redirectToRegister}
                        className="text-floral-white font-semibold">
                            Don't have an account?
                    </button>
                    {errors && errors.general && (
                        <p className="text-red-500 font-semibold">
                            {errors.general}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;