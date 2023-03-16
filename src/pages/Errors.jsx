/* ----------- 
ERRORS COMPONENT
----------- */

// Styles
import "../styles/Errors.css";
// Other components and files
import excSign from "../images/exclamation-sign.svg";
import pageNotFount from "../images/404.jpg";
import { Link } from "react-router-dom";

// server-side error
export function ErrorMessage() {
    return (
        <div className="error-message">
            <div>
                <img src={excSign} alt="exclamation-sign" />
                <h2>Internal server error</h2>
                <div className="text">
                    <p>Something went wrong at our end.</p>
                    <p>Don't worry, it’s not you - it’s us. Sorry about that.</p>
                </div>
                <Link to="/characters">GO HOME</Link>
            </div>
        </div>
    );
}

// client-side error
export function PageNotFound() {
    return (
        <div className="page-not-found">
            <div>
                <img src={pageNotFount} alt="error 404" />
                <Link to="/characters">GO HOME</Link>
            </div>
        </div>
    );
}
