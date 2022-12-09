import DataHandler from "./DataHandler";
import Pokemon from "./Pokemon";

const BattleAudio = new Audio('../audio/Pokémon FireRed & LeafGreen - Gym Leader & Elite Four Battle Music (HQ).mp3');
const VictoryAudio = new Audio('../audio/Victory! Trainer Theme.mp3');
const LoseAudio = new Audio('../audio/Epic Sad Music - The Greatest Defeat.mp3');
//Start the game on click
const start_screen = document.querySelector("#start-screen");
const battle_stage = document.querySelector("#battle-stage");
document.querySelector('#StartGame').addEventListener("click", (e) => {
  e.preventDefault();
  start_screen.style.display = 'none';
  battle_stage.style.display = 'inline-block';
  
  BattleAudio.play();
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
      })
    });
  }

  Opponent(){
    if(this.userTurn){
      this.User();
    }
    const index = Math.floor(Math.random() * 3);
    this.Action(false, this.opponentPokemon.selectedMoves[index]);

    this.userTurn = true;
  }

  User(move){
    if(!this.userTurn){
      this.console.innerHTML += "<br>It isn't your turn";
      return;
    }

    this.Action(true, move);
    this.userTurn = false;
    if(this.game){
      setTimeout(this.Opponent.bind(this), 3000);
    }
  }

  Action(isUser, move){
    
    //user attacks opponant
    if(isUser){
      this.console.innerHTML += `<br>${this.userPokemon.name} uses ${move.name}`;
      if(move.power != undefined){
        const damage = Math.floor(((12 * move.power * (this.userPokemon.stats.attack / this.opponentPokemon.stats.defense))/50) + 2);
        const hp = this.opponentPokemon.stats.hp - damage;
        this.opponentPokemon.stats.hp = hp;
      }
      else{
        this.console.innerHTML += `<br>${this.opponentPokemon.name} is uneffected!`
      }
      this.console.innerHTML += `<br>${this.opponentPokemon.name} HP: ${this.opponentPokemon.stats.hp}`;
    }
    //opponant attacks user
    else{
      this.console.innerHTML += `<br>${this.opponentPokemon.name} uses ${move.name}`;
      if(move.power != undefined){
        const damage = Math.floor(((12 * move.power * (this.opponentPokemon.stats.attack / this.userPokemon.stats.defense))/50) + 2);
        this.userPokemon.stats.hp = this.userPokemon.stats.hp - damage;
      }
      else{
        this.console.innerHTML += `<br>${this.userPokemon.name} is uneffected!`
      }
      this.console.innerHTML += `<br>${this.userPokemon.name} HP: ${this.userPokemon.stats.hp}`;
    }

    if(this.userPokemon.stats.hp <= 0){
      //user lost :(
      this.game = false;
      this.console.innerHTML += '<br>Game Over - Defeated';
      BattleAudio.pause();
      LoseAudio.play();
    }
    else if(this.opponentPokemon.stats.hp <= 0){
      //user won :)
      this.game = false;
      this.console.innerHTML += '<br>Game Over - Victory!!';
      BattleAudio.pause();
      VictoryAudio.play();
    }
    return;
  }
}