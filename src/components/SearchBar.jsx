/* ----------- 
SEARCH BAR COMPONENT
----------- */

// Dependencies
import { useEffect, useState } from "react";
// Styles
import "../styles/SearchBar.css";
// Other components and files
import { useCharactersData } from "../context/CharactersProvider";
import cleanInput from "../images/delete-text.svg";

export default function SearchBar() {
    // import functions from characters data Provider to change searched name, page number and fetching status
    const { setSearchedName, setPageNumber, setFetching } = useCharactersData();
    // state to keep track of typing inside search bar
    const [inputValue, setInputValue] = useState(localStorage.getItem("characterName") || "");

    useEffect(() => {
        // if input text doesn't match searched name, update that name
        if (inputValue.trim() !== localStorage.getItem("characterName")) {
            // make changes only if duration of user's typing of a new name is more that 0,5s
            const timer = setTimeout(() => {
                setSearchedName(inputValue);
                setFetching(true);
                setPageNumber(1);
            }, 500);
            // if a user enter the next letter faster than 0,5s, stop previous timer
            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line
    }, [inputValue]);

    return (
        <div className="search-bar-section">
            <div className="search-bar">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Filter by name ..."
                />
                {/* button to clean search bar input */}
                <img
                    onClick={() => setInputValue("")}
                    className={inputValue ? "active" : ""}
                    src={cleanInput}
                    alt="remove text icon"
                />
            </div>
        </div>
    );
}
