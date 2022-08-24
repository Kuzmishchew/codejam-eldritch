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
    let blueDeck = [];
    let brownDeck = [];

    if (currentDifficult == 'very-easy') {
        greenDeck = getVeryEasyDeck(greenCardsData, greenSum);
        blueDeck = getVeryEasyDeck(blueCardsData, blueSum);
        brownDeck = getVeryEasyDeck(brownCardsData, brownSum);
        // let srcDeck = [].concat(greenCardsData);
        // for (let i = 1; i <= greenSum; i++) {
        //     let restCardCount = 0;
        //     srcDeck.forEach(element => {
        //         if (element.difficulty == 'easy') {
        //             restCardCount++;
        //         }
        //     });
        //     let currentCard = restCardCount != 0 ? getRandomCard(srcDeck, 'easy') : getRandomCard(srcDeck, 'normal');
        //     greenDeck.push(currentCard);
        // }
    } 
    if (currentDifficult == 'easy') {
        greenDeck = getEasyDeck(greenCardsData, greenSum);
        blueDeck = getEasyDeck(blueCardsData, blueSum);
        brownDeck = getEasyDeck(brownCardsData, brownSum);
    }
    
    if (currentDifficult == 'medium') {
        greenDeck = getMediumDeck(greenCardsData, greenSum);
        blueDeck = getMediumDeck(blueCardsData, blueSum);
        brownDeck = getMediumDeck(brownCardsData, brownSum);
    }

    if (currentDifficult == 'hard') {
        greenDeck = getHardDeck(greenCardsData, greenSum);
        blueDeck = getHardDeck(blueCardsData, blueSum);
        brownDeck = getHardDeck(brownCardsData, brownSum);
    }

    

   //DEBUG
   console.log(greenDeck); 
   console.log(blueDeck);
   console.log(brownDeck);

}

function getRandomCard(srcDeck, difficulty = false) {
    let randomId = Math.floor(Math.random() * srcDeck.length);
    let card = {};

    if (difficulty) {
        if (srcDeck[randomId]['difficulty'] == difficulty) {            
            Object.assign(card, srcDeck[randomId]);
            srcDeck.splice(randomId, 1);
        } else {
            card = getRandomCard(srcDeck, difficulty);
        }
    } else {
        Object.assign(card, srcDeck[randomId]);
        srcDeck.splice(randomId, 1);
    }
    return card;
}

function getVeryEasyDeck(colorCardsData, cardsSum) {
    let resultDeck = [];
    let srcDeck = [].concat(colorCardsData);

    for (let i = 1; i <= cardsSum; i++) {
        let restCardCount = 0;
        srcDeck.forEach(element => {
            if (element.difficulty == 'easy') {
                restCardCount++;
            }
        });
        let currentCard = restCardCount != 0 ? getRandomCard(srcDeck, 'easy') : getRandomCard(srcDeck, 'normal');
        resultDeck.push(currentCard);
    }

    return resultDeck;
}
function getEasyDeck(colorCardsData, cardsSum) {
    let resultDeck = [];
    let srcDeck = [];
    colorCardsData.forEach((element, id) => {
        if (element.difficulty != 'hard') {
            let card = Object.assign({}, element);
            srcDeck.push(card);
        }
    });

    for (let i = 1; i <= cardsSum; i++) {        
        let currentCard = getRandomCard(srcDeck);
        resultDeck.push(currentCard);
    }
    return resultDeck;
}

function getMediumDeck(colorCardsData, cardsSum) {
    let resultDeck = [];
    let srcDeck = [].concat(colorCardsData);

    for (let i = 1; i <= cardsSum; i++) {
        let currentCard = getRandomCard(srcDeck);
        resultDeck.push(currentCard);
    }

    return resultDeck;
}

function getHardDeck(colorCardsData, cardsSum) {
    let resultDeck = [];
    let srcDeck = [];
    colorCardsData.forEach((element, id) => {
        if (element.difficulty != 'easy') {
            let card = Object.assign({}, element);
            srcDeck.push(card);
        }
    });

    for (let i = 1; i <= cardsSum; i++) {        
        let currentCard = getRandomCard(srcDeck);
        resultDeck.push(currentCard);
    }
    return resultDeck;
}

showAncient();
DIFFICLUTIES_INPUTS.forEach(element => {
    element.addEventListener('input', () => selectDifficulty(element.value));
});

MIX_BUTTON.addEventListener('click', getCardSet);