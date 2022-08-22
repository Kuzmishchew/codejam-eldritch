import ancients from '../assets/Ancients/index.js';

function showAncient() {
    for (let key in ancients) {
        document.getElementById(key).style.backgroundImage = `url(${ancients[key]}`;
    }
}

showAncient();