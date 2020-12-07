import "./styles.css";
import * as dataBusiness from "./data-business";
import * as utils from "./utils";

const root = document.getElementById("root");
const buttonNextPage = document.getElementById("next-page");

const showMoreInfo = (character) => {
    dataBusiness
      .getCharacterById(character.id)
      .then((data) => {
        utils.showCharacter(data);
      })
  };

dataBusiness.getCharactersByPage().then(data => {
    let characters = data.results;

    console.log(characters);

    const nodes = [];

    root.innerText = "";

    for (let character of characters) {
        // console.log(character)
        // console.log(character.image)
        const node = utils.createCharacterRow(character);
        node.onclick = () => {
            showMoreInfo(character);
          };
        nodes.push(node);
    }

    for (let node of nodes) {
        document.getElementById("root").append(node);
    }
})
