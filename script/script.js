import ancientsData from '../data/ancients.js';

const DIFFICLUTIES_INPUTS = document.getElementsByName('difficulty-level');

let currentAncient = {};
let currentDifficult = '';

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

function selectDifficulty(value) {
    currentDifficult = '';
    currentDifficult = value;

    //DEBUG
    console.log(currentDifficult);
}

showAncient();
DIFFICLUTIES_INPUTS.forEach(element => {
    element.addEventListener('input', () => selectDifficulty(element.value));
});