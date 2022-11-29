import { removeAllChildNodes } from "./utils.js";

export default class Pokemon {
    constructor(name, moves) {
        this.name = name;
        this.moves = moves;
        this.selectedMoves = [];
    }

    displayPokemon() {
        const pokemonDetails = document.getElementById('pokemon-details');
        const name = document.createElement('h4');
        const img = document.createElement('img');
        removeAllChildNodes(pokemonDetails);
        const movesList = document.getElementById('moves-available-list');
        removeAllChildNodes(movesList);
        this.generateMoves(movesList, this.moves);
        name.innerHTML = this.name;
        img.src = `./img/${this.name}-front.png`;
        pokemonDetails.appendChild(name);
        pokemonDetails.appendChild(img);
    }
    
    generateMoves(movesListElement, list) {
        list.forEach(move => {
            const moveElement = document.createElement('li');
            moveElement.dataset.move_name = move.move.name;
            moveElement.innerHTML = move.move.name;
            movesListElement.appendChild(moveElement);
        });
    }

    generateSelectedMoves(movesListElement, list) {
        removeAllChildNodes(movesListElement);
        list.forEach(move => {
            const moveElement = document.createElement('li');
            moveElement.dataset.move_name = move;
            moveElement.innerHTML = move;
            movesListElement.appendChild(moveElement);
        });
    }
    
    displaySelectedMoves() {
        const selectedMovesList = document.getElementById('moves-selected-list');
        this.generateSelectedMoves(selectedMovesList, this.selectedMoves);
        
    }

    addSelectedMove(move) {
        if (this.selectedMoves.indexOf(move) > -1 || this.selectedMoves.length >= 4 || move == undefined) {
            return;
        }
        
        this.selectedMoves.push(move);
        this.displaySelectedMoves();
    }

    removeSelectedMove(move) {
        if (this.selectedMoves.indexOf(move) == -1) {
            return;
        }
        
        const index = this.selectedMoves.indexOf(move);
        this.selectedMoves.splice(index, 1);
        this.displaySelectedMoves();
    }
}