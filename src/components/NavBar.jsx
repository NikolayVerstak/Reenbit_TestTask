/* ----------- 
NAVIGATION COMPONENT
----------- */

// Dependencies
import { NavLink, useLocation } from "react-router-dom";
// Styles
import "../styles/NavBar.css";
// Other components and files
import arrowLeft from "../images/arrow-left.svg";
import GoogleAuth from "./GoogleAuth";

export default function NavBar() {
    const { pathname } = useLocation();
    return (
        <div className="navbar">
            {/* show Go Back Button if pathname doesn't match with the main page pathname */}
            {pathname !== "/characters" && pathname !== "/" && (
                <NavLink className="go-back" to="/characters">
                    <img src={arrowLeft} alt="left arrow" />
                    Go Back
                </NavLink>
            )}
            <GoogleAuth />
        </div>
    );
}
