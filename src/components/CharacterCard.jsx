/* ----------- 
EACH CHARACTER'S CARD AT THE MAIN PAGE (LIST OF CHARACTERS)
----------- */

// Dependencies
import React from "react";
import { Link } from "react-router-dom";
// Styles
import "../styles/CharacterCard.css";
// Other components and files
import arrowRight from "../images/arrow-right.svg";

function CharacterCard({ characterData }) {
    // data is got from Fetch Characters component
    const { id, image, name, species } = characterData;

    return (
        <>
            {/* grey wrapper that appears when a user hovers on a card */}
            <div className="see-details">
                {/* redirect to the character's info page */}
                <Link to={`/character/${id}`}>
                    <span>Learn More</span>
                    <img src={arrowRight} alt="right arrow" />
                </Link>
            </div>
            <div className="card-image">
                <img src={image} alt={`${name}`} />
            </div>
            <div className="card-details">
                <h6 className="card-name">{name}</h6>
                <p className="card-species">{species}</p>
                {/* <span>{id}</span> */}
            </div>
        </>
    );
}

export default CharacterCard;
