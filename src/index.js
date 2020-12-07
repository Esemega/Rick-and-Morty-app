import "./styles.css";
import * as dataBusiness from "./data-business";
import * as utils from "./utils";

const root = document.getElementById("root");

const showMoreInfo = (character) => {
    dataBusiness
      .getCharacterById(character.id)
      .then((data) => {
        utils.showCharacter(data);
      })
};

const getPage = (event) => {
    let nextPage;
    let currentPageElement = document.getElementById("current-page");

    console.log( )

    if (event.target.id === "next-button" && Number(currentPageElement.innerText) < window.App.totalPages) {
         window.App.currentPage++;
    } else if(Number(currentPageElement.innerText) - 1 > 0){
        window.App.currentPage--;
    }
    
    getCharacters(window.App.currentPage);
    currentPageElement.innerText = window.App.currentPage;
    
    const characterDetail = document.getElementById("character-detail");
    characterDetail.innerHTML = "";
}

const getCharacters = page => {
    dataBusiness.getCharactersByPage(page).then(data => {
        const totalPages = data.info.pages;
        let characters = data.results;

        const nodes = [];

        root.innerText = "";

        for (let character of characters) {
            const node = utils.createCharacterRow(character);
            node.onclick = () => {
                showMoreInfo(character);
            };
            nodes.push(node);
        }


        for (let node of nodes) {
            document.getElementById("root").append(node);
        }

        window.App.totalPages = totalPages;
        document.getElementById("total-pages").innerText = window.App.totalPages;
    })

    return page;
}

const onloadEventHandler = () => {
    window.App = {
        currentPage: 0,
        totalPages: 0
    };

    var currentPage = getCharacters(1);

    window.App.currentPage = currentPage;

}

window.onload = onloadEventHandler;

document.getElementById("previous-button").addEventListener("click", getPage);
document.getElementById("next-button").addEventListener("click", getPage);