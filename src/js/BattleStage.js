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
    this.opponentPokemon = opponantPokemon;
  }

  StartBattle(){
    this.game = true;
    this.console = document.querySelector("#console");
    if(this.userPokemon.stats.speed >= this.opponentPokemon.stats.speed){
      this.userTurn = true;
      this.console.innerHTML = `${this.userPokemon.name} starts first`;
    }
    else{
      this.userTurn = false;
      this.console.innerHTML = `${this.opponentPokemon.name} starts first`;
      this.Opponent();
    }

    const userOptions = document.querySelectorAll(".selected-moves");
    userOptions.forEach(option => {
      option.addEventListener("click", (e) => {
        console.log(option);
        const move = this.userPokemon.selectedMoves[option.getAttribute('index')];
        this.User(move);
        //Action(true, option.move)
      })
    });
  }

  Opponent(){
    if(this.userTurn){
      this.User();
    }
    this.userTurn = true;
  }

  User(move){
    if(!this.userTurn){
      this.console.innerHTML += "<br>It isn't your turn";
    }
    else{
      this.Action(true, move);
    }
    this.userTurn = false;
  }

  Action(isUser, move){
    //user attacks opponant
    if(isUser){
      this.console.innerHTML += `<br>${this.userPokemon.name} uses ${move.name}`;
    }
    //opponant attacks user
    else{
      this.console.innerHTML += `<br>${this.opponentPokemon.name} uses ${move.name}`;
    }
    return;
  }
}