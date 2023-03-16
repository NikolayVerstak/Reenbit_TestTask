/* ----------- 
API REQUEST DETAILS
----------- */

// URL endpoint
export const api = "https://rickandmortyapi.com/graphql";

export const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export const options = {
    method: "POST",
    headers,
    body: JSON.stringify({}),
};

// Fetching server error handler
export const checkFetch = (response) => {
    if (!response.ok) {
        throw Error(`${response.statusText || "Error"} - ${response.url}`);
    }
    return response.json();
};
