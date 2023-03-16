// query to fetch all characters by name
export const CHARACTERS_BY_NAME = `
query Characters($page: Int, $name: String) {
    characters(page: $page, filter: {name: $name}) {
        info {
            pages
        }
        results {
            id
            name
            species
            image
        }
    }
}`;

// query to fetch the particular character by its ID
export const CHARACTER_BY_ID = `
query Character ($id: ID!) {
    character(id: $id)  {
        id
        name
        species
        image
        gender
        status
        origin {
            name
        }
        type
    }
}
`;
