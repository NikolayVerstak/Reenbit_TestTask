/* ----------- 
ONE CHARACTER's DETAILS PAGE
----------- */

// Dependencies
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
// Styles
import "../styles/CharacterDetails.css";
// Other components and files
import { api, checkFetch, options } from "../graphQl/fetch";
import { CHARACTER_BY_ID } from "../graphQl/queries";
import Loading from "../components/Loading";

export default function CharacterDetails() {
    // id is got from the pathname
    const { id } = useParams();

    const [characterData, setCharacterData] = useState({});
    const { image, name } = characterData;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // fetch the character by id
        options.body = JSON.stringify({
            query: CHARACTER_BY_ID,
            variables: { id },
        });
        fetch(api, options)
            .then(checkFetch)
            .then((response) => {
                // if a user typed not existing character id in pathname
                if (response.data.character === null) {
                    setError("500 Internal Server Error");
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError(null);
                    setCharacterData(response.data.character);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
    }, [id]);

    // component to render all character's details
    function listOfDetails() {
        const sectionNames = ["gender", "status", "species", "origin", "type"];
        return sectionNames.map((title, i) => {
            // origin has nested object {origin: {name: "..."}}
            let characterInfo =
                title !== "origin" ? characterData[title] : characterData.origin?.name;
            return (
                <div key={i} className="character-info-line">
                    <h6>{title.charAt(0).toUpperCase() + title.slice(1)}</h6>
                    {/* type could be empty sting, so in that case show "unknown" */}
                    <p>{characterInfo || "Unknown"}</p>
                </div>
            );
        });
    }

    // if server error exist, move to Error page
    if (error) return <Navigate to="/error" redirect />;
    // if the page is rendering, show full-page loading
    if (loading) return <Loading scope="page" />;

    return (
        <div className="character-page">
            {characterData && (
                <div className="character-details">
                    {/* character's image */}
                    <div className="character-avatar">
                        <img src={image} alt={`${name}`} />
                    </div>
                    {/* character's name */}
                    <div className="character-name">
                        <h4 className="character-name">{name}</h4>
                    </div>
                    {/* character's details */}
                    <div className="character-description">
                        <h5>Information</h5>
                        <>{listOfDetails()}</>
                    </div>
                </div>
            )}
        </div>
    );
}
