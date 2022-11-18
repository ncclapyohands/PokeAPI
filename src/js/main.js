function generatePokemons() {
    const listElement = document.getElementById("pokemon-list")
    const template = document.getElementById('pokemon-card__template');
    for (let index = 0; index < 100; index++) {
        const clone = template.content.cloneNode(true);
        this.prepareTemplate(clone);
        listElement.appendChild(clone);
        
    }
}

function prepareTemplate(clone) {
    clone.querySelector('img').src = './img/bulbasaur.png';
    clone.querySelector('h5').innerHTML = 'Bulbasaur';
}

generatePokemons();