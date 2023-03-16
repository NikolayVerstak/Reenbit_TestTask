/* ----------- 
LOADING ANIMATION
----------- */

// Styles
import "../styles/Loading.css";

export default function Loading({ scope }) {
    // scope shows the area of loading or purpose
    return (
        <div className={scope === "page" ? "loading-background show" : "loading-background"}>
            <div className={scope === "page" ? "loading show" : "loading"} id={`${scope}`}>
                <div className="loading-balls">
                    <div className="loading-ball"></div>
                    <div className="loading-ball"></div>
                    <div className="loading-ball"></div>
                </div>
                {/* for full-page loding process the text "Loading..." is shown */}
                {scope === "page" ? <div className="loading-text">Loading...</div> : null}
            </div>
        </div>
    );
}
