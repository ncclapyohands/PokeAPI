import DataHandler from "./DataHandler.js";
import Pokemon from './Pokemon.js'

const dataHandler = new DataHandler('search-input');
dataHandler.init()

var pokemon = new Pokemon('', []);
async function slideEvent(e) {
    const pokemonListElement = document.querySelector('#pokemon-list-container');
    pokemonListElement.classList.toggle('slide');
    document.querySelector('#pokemon-moveset').classList.toggle('slide');

    if (pokemonListElement.classList.contains('slide')) {
        const url =  e.path[2].dataset.url;
        const res = await dataHandler.getPokemon(url);

        console.log(res)

        pokemon = new Pokemon(res.name, res.moves);
        pokemon.displayPokemon();
    } else {
        pokemon = new Pokemon('', []);
        pokemon.displaySelectedMoves();
    }
}

document.getElementById('pokemon-list').addEventListener('click', slideEvent)
document.getElementById('back').addEventListener('click', slideEvent)
document.getElementById('moves-available-list').addEventListener('click', (e) => {
    pokemon.addSelectedMove(e.target.dataset.move_name);
});

document.getElementById('moves-selected-list').addEventListener('click', (e) => {
    pokemon.addSelectedMove(e.target.dataset.move_name);
});