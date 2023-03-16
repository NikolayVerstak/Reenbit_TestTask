/* ----------- 
CONTEXT PROVIDER TO PASS CHARACTER's DATA TO  FETCH_component, SEARCH_component, PAGINATION 
----------- */

// Dependencies
import { useContext, createContext, useState } from "react";

const CharactersDataContext = createContext();

export const CharactersProvider = ({ children }) => {
    // local storage variables
    const storedCharacterName = localStorage.getItem("characterName");
    const storedCurrentPage = localStorage.getItem("currentPage");
    // states variables
    const [searchedName, setSearchedName] = useState(storedCharacterName || "");
    const [currentPage, setPageNumber] = useState(Number(storedCurrentPage) || 1);
    const [characters, setCharacters] = useState([]);
    // fetching state is used for first page load and there is no data stored in Local Storage
    const [fetching, setFetching] = useState(true);
    const value = {
        fetching,
        setFetching,
        searchedName,
        setSearchedName,
        currentPage,
        setPageNumber,
        characters,
        setCharacters,
    };

    return (
        <CharactersDataContext.Provider value={value}>{children}</CharactersDataContext.Provider>
    );
};

// create a custom hook
export const useCharactersData = () => {
    return useContext(CharactersDataContext);
};
