/* ----------- 
MAIN PAGE WITH CHARACTERS FILTERED BY NAME (OR ALL OF THEM)
----------- */

// Styles
import "../styles/CharactersList.css";
// Other components and files
import SearchBar from "../components/SearchBar";
import FetchCharacters from "../components/FetchCharacters";
import { CharactersProvider } from "../context/CharactersProvider";
import logo from "../images/rick-and-morty.svg";

export default function CharactersList() {
    return (
        // context has searched name, current page, characters array and fetching status
        <CharactersProvider>
            <div className="characters-list">
                <div className="logo-section">
                    <img src={logo} alt="Rick and Morty" />
                </div>
                <SearchBar />
                <FetchCharacters />
            </div>
        </CharactersProvider>
    );
}
