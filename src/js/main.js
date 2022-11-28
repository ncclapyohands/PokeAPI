import DataHandler from "./DataHandler.js";

const dataHandler = new DataHandler('search-input');
dataHandler.init()

function slideEvent(e) {
    const pokemonListElement = document.querySelector('#pokemon-list-container');
    pokemonListElement.classList.toggle('slide');
    document.querySelector('#pokemon-moveset').classList.toggle('slide');

    if (pokemonListElement.classList.contains('slide')) {
        // console.log(e);
        const url =  e.path[2].dataset.url;
        dataHandler.getPokemon(url);
    }
}

document.getElementById('pokemon-list').addEventListener('click', slideEvent)
document.getElementById('back').addEventListener('click', slideEvent)