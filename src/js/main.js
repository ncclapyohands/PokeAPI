import Battle from "./BattleStage.js";
import DataHandler from "./DataHandler.js";
import Pokemon from './Pokemon.js'

const dataHandler = new DataHandler('search-input');
dataHandler.init()

var pokemon = new Pokemon('', []);
async function slideEvent(e) {
    const pokemonListElement = document.querySelector('#pokemon-list-container');
    pokemonListElement.classList.toggle('slide');
    document.querySelector('#pokemon-moveset').classList.toggle('slide');

    //scroll to top of page automatically
    window.scrollTo(0, 0);
    

    if (pokemonListElement.classList.contains('slide')) {
      //find li element no matter the index 
        const li = e.path.find(item => {
          return item.nodeName === "LI";
        })
        const id =  li.dataset.id;
        const res = await dataHandler.getPokemon(id);

        pokemon = new Pokemon(res.name, res.moves);
        pokemon.displayPokemon();
    } else {
        pokemon = new Pokemon('', []);
        pokemon.displaySelectedMoves();
    }
}

async function slideAgainEvent(e) {
    e.preventDefault();
    const moveset = document.querySelector('#pokemon-moveset');
    moveset.classList.toggle('slide-again');
    document.querySelector('#game').classList.toggle('slide-again');
    window.scrollTo(0, 0);

    // change so no scrolling on elements
    // moveset.style.display = 'none';
    // const pokemonListElement = document.querySelector('#pokemon-list-container');
    // pokemonListElement.style.display = 'none';

    //call battle start stuff
    const opponantPokemon = await pickRandomPokemon();
    let battle = new Battle(pokemon, opponantPokemon);
    displayBattle(battle);
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

function displayBattle(battle){
  const battle_stage = document.querySelector("#battle-stage");
  console.log(battle);
  const template = `
    <div id='opponant'>
    <img src='../img/${battle.opponantPokemon.name}-front.png' alt='${battle.opponantPokemon.name} picture'>
      <table>
        <tr>
          <td>${battle.opponantPokemon.selectedMoves[0].name}<td>
          <td>${battle.opponantPokemon.selectedMoves[1].name}<td>
        </tr>
        <tr>
          <td>${battle.opponantPokemon.selectedMoves[2].name}<td>
          <td>${battle.opponantPokemon.selectedMoves[3].name}<td>
        </tr>
      </table>
    </div>
    <div id='user'>
      <img src='../img/${battle.userPokemon.name}-back.png' alt='${battle.userPokemon.name} picture'>
      <table>
        <tr>
          <td>${battle.userPokemon.selectedMoves[0].name}<td>
          <td>${battle.userPokemon.selectedMoves[1].name}<td>
        </tr>
        <tr>
          <td>${battle.userPokemon.selectedMoves[2].name}<td>
          <td>${battle.userPokemon.selectedMoves[3].name}<td>
        </tr>
      </table>
    </div>`;
  battle_stage.innerHTML += template;
}

async function pickRandomPokemon(){
  //choose random number from 0-150. Select pokemon using id
  const id = Math.floor(Math.random() * 150);
  let randPokemon = await new DataHandler('').getPokemon(id);
  console.log(randPokemon);

  let pokemon = new Pokemon(randPokemon.name, randPokemon.moves);

  //select 4 random moves from its move set
  const numMoves = pokemon.moves.length;
  for(let i = 0; i < 4; i++){
    const randId = Math.floor(Math.random() * numMoves);
    const randMove = pokemon.moves[randId];
    pokemon.selectedMoves.push(randMove);
  }

  console.log(pokemon.selectedMoves)
  //return pokemon
  return pokemon;
}