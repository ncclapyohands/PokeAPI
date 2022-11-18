const baseUrl = 'http://pokeapi.co/api/v2';


export default class DataHandler {
    constructor() {

    }

    async init() {
        await this.getData();
    }

    async getData() {
        const res = await fetch(`${baseUrl}/pokemon/?limit=151`)
          .then(convertToJson).then((data) => data);

        this.generatePokemons(res.results)
        console.log(res.results);
    }

    generatePokemons(pokemons) {
        const listElement = document.getElementById("pokemon-list")
        const template = document.getElementById('pokemon-card__template');
        
        pokemons.forEach(pokemon => {
            const clone = template.content.cloneNode(true);
            this.prepareTemplate(clone, pokemon);
            listElement.appendChild(clone);    
        });
    }
    
    prepareTemplate(clone, pokemon) {
        clone.querySelector('img').src = './img/bulbasaur.png';
        clone.querySelector('h5').innerHTML = pokemon.name;
    }
}

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
}

