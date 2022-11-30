const baseUrl = 'http://localhost:3000';


export default class DataHandler {
    constructor(searchElementId) {
        this.pokemons = [];
        this.searchElement = document.getElementById(searchElementId)
    }

    async init() {
        this.searchElement.addEventListener('keyup', () => {
            console.log(this.searchElement.value);
            this.filterByName(this.searchElement.value);
        })
        await this.getData();
    }

    async getData() {
        const res = await fetch(`${baseUrl}/pokemon/`)
          .then(convertToJson).then((data) => data);
        
        this.pokemons = res
        this.generatePokemons(res)
    }

    generatePokemons(pokemons) {
        const listElement = document.getElementById("pokemon-list")
        const template = document.getElementById('pokemon-card__template');
        
        listElement.innerHTML = '';

        pokemons.forEach(pokemon => {
            const clone = template.content.cloneNode(true);
            this.prepareTemplate(clone, pokemon);
            listElement.appendChild(clone);    
        });
    }

    async getPokemon(id) {
        const res = await fetch(`${baseUrl}/pokemon/${id}`)
          .then(convertToJson).then((data) => data);
        return res
    }

    async getMoves() {

    }
    
    prepareTemplate(clone, pokemon) {
        clone.querySelector('img').src = `./img/${pokemon.name}-front.png`;
        clone.querySelector('h5').innerHTML = pokemon.name;
        clone.querySelector('li').dataset.id = pokemon.id;
    }

    filterByName(name) {
        const tempPokemons = this.pokemons.filter(pokemon => pokemon.name.startsWith(name));
        this.generatePokemons(tempPokemons);
    }
}

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
}

