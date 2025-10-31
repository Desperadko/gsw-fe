import { useNavigate } from "react-router-dom";
import logo from "../../../../Assets/logo.png";
import { ROUTES } from "../../../../Constants/RoutesConstants";
import NavLink from "../NavLink/NavLink";

function Footer() {
    const navigate = useNavigate();

    function redirectToHome() {
        navigate(ROUTES.HOME);
    }

    return(
        <div
            className="
                flex flex-col justify-center items-center gap-10
                bg-eerie-black border-t-1 border-floral-white
                p-10">
            <h3
                className="
                    text-floral-white hover:text-flame
                    transition-colors duration-200
                    font-bold
                    cursor-pointer"
                onClick={redirectToHome}>
                GAME SHOP WEBSITE
            </h3>
            <div className="flex gap-10">
                <nav className="flex flex-col items-center gap-4">
                    <NavLink to={ROUTES.TESTING}>About</NavLink>
                    <NavLink to={ROUTES.TESTING}>Refund</NavLink>
                    <NavLink to={ROUTES.TESTING}>Support</NavLink>
                </nav>
                <nav className="flex flex-col items-center gap-4">
                    <NavLink to={ROUTES.TESTING}>Privacy Policy</NavLink>
                    <NavLink to={ROUTES.TESTING}>Cookies</NavLink>
                    <NavLink to={ROUTES.TESTING}>Legal</NavLink>
                </nav>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4">
                <p className="text-xs">© 2025, GSW Gaming, Inc. All rights reserved. GSW, GSW Gaming, the GSW Gaming logo, 
                    and all associated logos and trademarks are trademarks or registered trademarks of GSW Gaming, Inc. 
                    in Bulgaria and elsewhere. All other brands, product names, company names, trademarks, service marks, 
                    and logos mentioned herein are the property of their respective owners and are used for identification purposes only. 
                    Use of third-party marks does not imply endorsement, sponsorship, or affiliation with GSW Gaming, Inc.</p>
                <img
                    src={logo}
                    alt="GSW Logo"
                    className="w-16 h-fit cursor-pointer"
                    onClick={redirectToHome}/>
            </div>
        </div>
    )
}

export default Footer;