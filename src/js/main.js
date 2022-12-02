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
        const id =  e.path[2].dataset.id;
        const res = await dataHandler.getPokemon(id);

        console.log(res)

        pokemon = new Pokemon(res.name, res.moves);
        pokemon.displayPokemon();
    } else {
        pokemon = new Pokemon('', []);
        pokemon.displaySelectedMoves();
    }
}

function slideAgainEvent(e) {
    e.preventDefault();
    document.querySelector('#pokemon-moveset').classList.toggle('slide-again');
    document.querySelector('#game').classList.toggle('slide-again');
}

document.getElementById('pokemon-list').addEventListener('click', slideEvent)
document.getElementById('back').addEventListener('click', slideEvent)
document.getElementById('moves-available-list').addEventListener('click', (e) => {
    pokemon.addSelectedMove(e.target.dataset.move_name);
});

document.getElementById('start').addEventListener('click', slideAgainEvent)

document.getElementById('moves-selected-list').addEventListener('click', (e) => {
    pokemon.removeSelectedMove(e.target.dataset.move_name);
});
document.getElementById('back-to-select').addEventListener('click', slideEvent)
