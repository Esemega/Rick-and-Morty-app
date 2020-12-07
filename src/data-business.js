import axios from "axios";

const getCharactersByPage = (pageNumber) => {
    return axios
    .get("https://rickandmortyapi.com/api/character?page="+pageNumber)
    .then(response => {
        return response.data
    })
}

const getCharacterById = (id) => {
    return axios
    .get("https://rickandmortyapi.com/api/character/" + id)
    .then(response => {
        return response.data;
    })
}

export { getCharactersByPage, getCharacterById }