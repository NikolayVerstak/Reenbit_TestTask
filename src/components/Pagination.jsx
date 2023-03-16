/* ----------- 
PAGINATION COMPONENT
----------- */

// Dependencies
import React, { useEffect, useState } from "react";
// Styles
import "../styles/Pagination.css";
// Other components and files
import { useCharactersData } from "../context/CharactersProvider";

export default function Pagination({ totalPages }) {
    // current page and function to update it from characters data Provider
    const { currentPage, setPageNumber } = useCharactersData();
    // array of buttons that we see on the page
    const [buttonsArray, setButtonsArray] = useState([]);
    // array that contains all number of pages
    const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // functions to increase/reduce page number
    const handlePrevPage = () => setPageNumber((page) => page - 1);
    const handleNextPage = () => setPageNumber((page) => page + 1);

    useEffect(() => {
        // array of buttons that are shown on the page
        let visibleButtonsArray = [...paginationNumbers];

        let dotsEnd = "...";
        let dotsLeft = "... ";
        let dotsRight = " ...";

        // total number of pages less than 6
        if (totalPages < 6) {
            visibleButtonsArray = paginationNumbers;
        }
        // active page is from 1 to 3
        else if (currentPage >= 1 && currentPage <= 3) {
            visibleButtonsArray = [1, 2, 3, 4, dotsEnd, totalPages - 1, totalPages];
        }
        // active page is 4
        else if (currentPage === 4) {
            const slicedArray = paginationNumbers.slice(0, 5);
            visibleButtonsArray = [...slicedArray, dotsEnd, totalPages];
        }
        // active page is beetween 4 and before penultimate number
        // (for ex., if total pages is 10 those numbers will be 5,6,7)
        else if (currentPage > 4 && currentPage < totalPages - 2) {
            // array of 3 middle numbers
            const slicedArray = paginationNumbers.slice(currentPage - 2, currentPage + 1);
            // final array will be [1, ..., 5,6,7, ..., 10]
            visibleButtonsArray = [1, dotsLeft, ...slicedArray, dotsRight, totalPages];
        }
        // active page equals to one of 3 last numbers from array
        // (for ex., if total pages is 10 those numbers will be 8,9,10)
        else if (currentPage > totalPages - 3) {
            // array of 4 last numbers
            const slicedArray = paginationNumbers.slice(totalPages - 4);
            // final array will be [1, 2, ..., 7,8,9,10]
            visibleButtonsArray = [1, 2, dotsLeft, ...slicedArray];
        }
        setButtonsArray(visibleButtonsArray);
        // eslint-disable-next-line
    }, [currentPage]);

    // rules when a user clicks on dots of pagination
    function dotsClicked(dotsType, buttonsArray) {
        if (dotsType === "...") {
            // our array looks like [1, 2, 3, 4, "...", , 10], so length is 7, dots index is 4
            setPageNumber(buttonsArray[buttonsArray.length - 4] + 1);
        } else if (dotsType === " ...") {
            // our array looks like [1, ..., 5, 6, 7,..., 10], number with index 3 is middle page 6,
            // so click on right dots will open 8th page
            setPageNumber(buttonsArray[3] + 2);
        } else if (dotsType === "... ") {
            // so click on left dots will open 4th page
            setPageNumber(buttonsArray[3] - 2);
        }
    }

    // function to move to the top of the page if a user clicks on pagination buttons
    const moveToTop = (e) => {
        e.stopPropagation();
        (e.target.localName === "button" || e.target.localName === "span") &&
            !e.target.classList.contains("active") &&
            window.scrollTo(0, 0);
    };

    return (
        <div className="pagination-wrapper">
            <div className="pagination-block" onClick={(e) => moveToTop(e)}>
                {/* "show the previous page" button */}
                <button
                    className={currentPage !== 1 ? "prev-button" : "prev-button disabled"}
                    onClick={handlePrevPage}></button>
                {/* buttons with number of pages */}
                <div
                    className="pagination-numbers"
                    // pass number of buttons to css to change this div with accordintly
                    style={totalPages < 6 ? { "--pages": totalPages } : { "--pages": 7 }}>
                    {buttonsArray.map((pageNum, i) => {
                        return (
                            <span
                                key={i}
                                onClick={(e) =>
                                    Number(e.target.innerText)
                                        ? // update current page
                                          setPageNumber(pageNum)
                                        : // callbacks for dots click
                                          dotsClicked(e.target.innerHTML, buttonsArray)
                                }
                                className={pageNum === currentPage ? "active" : ""}>
                                {pageNum}
                            </span>
                        );
                    })}
                </div>
                {/* "show the next page" button */}
                <button
                    className={currentPage !== totalPages ? "next-button" : "next-button disabled"}
                    onClick={handleNextPage}></button>
            </div>
        </div>
    );
}
