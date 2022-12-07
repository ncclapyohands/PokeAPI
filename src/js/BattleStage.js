import DataHandler from "./DataHandler";
import Pokemon from "./Pokemon";

//Start the game on click
const start_screen = document.querySelector("#start-screen");
const battle_stage = document.querySelector("#battle-stage");
document.querySelector('#StartGame').addEventListener("click", (e) => {
  e.preventDefault();
  start_screen.style.display = 'none';
  battle_stage.style.display = 'inline-block';
});

export default class Battle{
  constructor(userPokemon, opponantPokemon){
    this.userPokemon = userPokemon;
    this.opponantPokemon = opponantPokemon;
  }
}