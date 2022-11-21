import DataHandler from "./DataHandler.js";

const dataHandler = new DataHandler('search-input');
dataHandler.init()

function slideEvent(e) {
    document.querySelector('#pokemon-list-container').classList.toggle('slide');
    document.querySelector('#pokemon-moveset').classList.toggle('slide');
}

document.getElementById('pokemon-list').addEventListener('click', slideEvent)
document.getElementById('back').addEventListener('click', slideEvent)