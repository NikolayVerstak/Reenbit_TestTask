/* ----------- 
COMPONENT TO FETCH CHARACTERS FILTERED BY NAME (OR ALL OF THEM)
----------- */

// Dependencies
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// Styles
import "../styles/FetchCharacters.css";
// Other components and files
import { CHARACTERS_BY_NAME } from "../graphQl/queries.js";
import { api, options, checkFetch } from "../graphQl/fetch.js";
import { useCharactersData } from "../context/CharactersProvider";
import CharacterCard from "../components/CharacterCard";
import Loading from "../components/Loading";
import Pagination from "./Pagination";

export default function FetchCharacters() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    // states from characters data Provider
    const { searchedName, currentPage, fetching, setFetching, characters, setCharacters } =
        useCharactersData();

    useEffect(() => {
        /* fetching data from Rick and Morty API: 
        1) if searched character's name was changed, 
        2) if current page was changed, 
        3) if it's first page load and there is no data stored in Local Storage
        */
        if (
            fetching ||
            searchedName !== localStorage.getItem("characterName") ||
            currentPage !== localStorage.getItem("currentPage")
        ) {
            // show loading animation when the fetching process starts
            handleLoadingAnimation("add");
            // fetch characters by name (or fetch all characters by default)
            options.body = JSON.stringify({
                query: CHARACTERS_BY_NAME,
                variables: {
                    page: currentPage,
                    name: searchedName,
                },
            });
            fetch(api, options)
                // check for server-side error
                .then(checkFetch)
                .then((response) => {
                    // after data load, hide loading animation
                    handleLoadingAnimation("remove");
                    const { info, results } = response.data.characters;
                    // make a new characters list from response
                    const newList = [...results];
                    // sort a new array by name
                    const sortedNewList = newList.sort((a, b) => (a.name > b.name ? 1 : -1));
                    setLoading(false);
                    setError(null);
                    setCharacters(sortedNewList);
                    setTotalPages(info.pages);
                    // store just used character's name and current page in Local Storage
                    localStorage.setItem("characterName", searchedName);
                    localStorage.setItem("currentPage", currentPage);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.message);
                })
                // stop fetching process
                .finally(() => setFetching(false));
        }
        // eslint-disable-next-line
    }, [searchedName, currentPage]);

    // function to show/hide loading animation when the fetching process starts/finishes
    function handleLoadingAnimation(type) {
        const loadingAnimation = document.querySelector(".loading");
        if (loadingAnimation) {
            type === "remove" && loadingAnimation.classList.remove("show");
            type === "add" && loadingAnimation.classList.add("show");
        }
    }

    // if server error exists, move to Error page
    if (error) return <Navigate to="/error" redirect />;
    // if the page is rendering, show full-page loading
    if (loading) return <Loading scope="page" />;

    // if there are no chracters matches to searched character's name, show not-found-block
    if (!totalPages)
        return (
            <div className="characters-section">
                <Loading scope="fetch-characters" />
                <CharactersNotFound />
            </div>
        );

    return (
        <div className="characters-section">
            <Loading scope="fetch-characters" />
            <div className="cards-grid">
                {/* show characters array as a list of cards */}
                {characters.map((character, i) => {
                    return (
                        <div className="character-card" key={i}>
                            <CharacterCard characterData={character} />
                        </div>
                    );
                })}
            </div>
            {/* show pagination buttons, if pages are more than 2 and fetching proccess finished */}
            {!fetching && totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
    );
}

/* ----------- 
"CHARACTERS ARE NOT FOUND" SECTION UNDER SEARCH BAR
----------- */
export function CharactersNotFound() {
    return (
        <div className="characters-not-found">
            <div className="search-img"></div>
            <h6>No results found</h6>
            <p>Please, check your search request and try again</p>
        </div>
    );
}
