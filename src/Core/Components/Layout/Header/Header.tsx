import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../../Constants/RoutesConstants";
import logo from "../../../../Assets/logo.png"

function Header({authenticated} : {authenticated: boolean}) {
    
    const navigate = useNavigate();

    function redirectToHome() {
        navigate(ROUTES.HOME);
    }
    
    return(
        <div className="flex justify-between max-w-screen-lg mx-auto px-5">
            <div className="flex gap-10">
                <img
                    src={logo}
                    alt="GSW Logo"
                    className="w-32 rounded-2xl cursor-pointer"
                    onClick={redirectToHome}/>
                <ul className="flex items-center gap-4">
                    <li className="cursor-pointer">
                        Browse
                    </li>
                    <li className="cursor-pointer">
                        Forums
                    </li>
                    <li className="cursor-pointer">
                        Contacts
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6">
            {authenticated
            ?
                <button className="h-fit">
                    Account
                </button>
            :
                <div>
                    <button>
                        Sign up
                    </button>
                    <button>
                        Login
                    </button>
                </div>
            }
            </div>
        </div>
    )
}

export default Header;