import ancientsData from '../data/ancients.js';
import greenCardsData from '../data/mythicCards/green/index.js';
import brownCardsData from '../data/mythicCards/brown/index.js';
import blueCardsData from '../data/mythicCards/blue/index.js';


const DIFFICLUTIES_INPUTS = document.getElementsByName('difficulty-level');
const MIX_BUTTON = document.querySelector('.mix-button');

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

    // getCardSet();
    //DEBUG
    console.log(currentDifficult);
}

function getCardSet() {
    let greenSum = currentAncient.firstStage.greenCards + currentAncient.secondStage.greenCards + currentAncient.thirdStage.greenCards;
    let blueSum = currentAncient.firstStage.blueCards + currentAncient.secondStage.blueCards + currentAncient.thirdStage.blueCards;
    let brownSum = currentAncient.firstStage.brownCards + currentAncient.secondStage.brownCards + currentAncient.thirdStage.brownCards;

    let greenDeck = [];

    if (currentDifficult = 'very-easy') {
        greenCardsData.forEach(card => {
            if (card.difficulty == 'easy') {
                greenDeck.push(card);
            }
        });
    }
    

   //DEBUG
   console.log(greenDeck); 
//    console.log(`Синие: ${blueSum}`);
//    console.log(`Коричнивые: ${brownSum}`);     
}

function selectCard() {

}
showAncient();
DIFFICLUTIES_INPUTS.forEach(element => {
    element.addEventListener('input', () => selectDifficulty(element.value));
});

MIX_BUTTON.addEventListener('click', getCardSet);