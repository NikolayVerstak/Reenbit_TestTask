# Overview

Rick and Morty is a web-app that allows a user to search for cartoon characters and find out details about each of them.

This app is implemented according to the next **requirements**:

-   the appearance of the pages should match up with the Figma design (pure CSS);
-   responsive design;
-   implement a search through all characters by their name. Filtered results of searching should be sorted;
-   implement login through third-party providers.
-   “go back” button redirects a user to the previous route with the list of characters;
-   when the app runs, there should be a request to the API and rendering of a list of characters from the cartoon. That list should be sorted by name;
-   when a user clicks on a particular character, there should be a new request for that character and redirect to another route with more detailed information about it;
-   when the page is reloaded or a user goes through the routes, the search data should be saved;

The app is deployed into the next link **https://rick-and-morty-cartoon.netlify.app**.

## Technologies

HTML, CSS, JS (React).

## Dependencies

Data is fetched from the Rick and Morty API using GraphQL queries to [this endpoint](https://rickandmortyapi.com/graphql).

## Appearance

###### The page with a list of all characters:

<img src="/appearance/characters_list_web.png" alt="Characters list"  height="1000px">

###### The list of characters filtered by the name:

<img src="/appearance/characters_list_filtered.png" alt="Filtered list">

|               The page with details about the particular character:               |                              Mobile appearance of a list:                              |
| :-------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
| <img src="/appearance/one_character_web.png" alt="Filtered list"  height="700px"> | <img src="/appearance/characters_list_mobile.png" alt="Filtered list"  height="700px"> |

## How to launch locally

In the project directory you should:

-   Create .env-file and define an environmental variable called REACT_APP_CLIENT_ID inside that file. The variable should equal your Client ID from a project in [https://console.cloud.google.com/](https://console.cloud.google.com/). Example:

    `REACT_APP_CLIENT_ID=23423436-es23 ... ... apps.googleusercontent.com`

-   Install dependencies

    `npm install`

-   Start the project

    `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
