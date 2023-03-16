/* ----------- 
MAIN COMPONENT THAT ASSOCIATE ALL OTHER COMPONENTS
----------- */

// Dependencies
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// Styles
import "../styles/App.css";
// Other components and files
import CharactersList from "../pages/CharactersList.jsx";
import CharacterDetails from "../pages/CharacterDetails.jsx";
import { ErrorMessage, PageNotFound } from "../pages/Errors";
import Layout from "./Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Navigate replace to="/characters" />} />
                    <Route path="/characters" element={<CharactersList />} />
                    <Route path="/character/:id" element={<CharacterDetails />} />
                </Route>
                <Route path="/error/" element={<ErrorMessage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
