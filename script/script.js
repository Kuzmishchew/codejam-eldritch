import ancientsData from '../data/ancients.js';

let currentAncient = {};

function showAncient() {
    ancientsData.forEach(element => {
        let cardFace = document.getElementById(element.id);
        cardFace.style.backgroundImage = `url(${element.cardFace}`;

        cardFace.addEventListener('click', () => selectAnciant(element));
    });
}

function selectAnciant(element) {
    currentAncient = {};
    Object.assign(currentAncient, element);

    //DEBUG
    console.log(currentAncient);
}

showAncient();