/* ----------- 
LAYOUT COMPONENT 
----------- */

// Dependencies
import { Outlet } from "react-router-dom";
// Other components
import NavBar from "./NavBar";

function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default Layout;
