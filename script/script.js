import ancientsData from '../data/ancients.js';
import greenCardsData from '../data/mythicCards/green/index.js';
import brownCardsData from '../data/mythicCards/brown/index.js';
import blueCardsData from '../data/mythicCards/blue/index.js';


const DIFFICLUTY_CONTAINER = document.querySelector('.difficulty-container');
const DIFFICLUTIES_INPUTS = document.getElementsByName('difficulty-level');
const MIX_BUTTON = document.querySelector('.mix-button');
const PHASE_CONTAINER = document.querySelector('.phase-container');
const DECK_CONTAINER = document.querySelector('.deck');
const UNFLIP_CARD = document.querySelector('.unflip-card');
const GAME_CARD = document.querySelector('.game-card');

let currentAncient = {};
let currentDifficult = '';

let greenDeck = [];
let blueDeck = [];
let brownDeck = [];

let firstSet = [];
let secondSet = [];
let thirdSet = [];

let gameDeck = [];

function showAncient() {
    ancientsData.forEach(element => {
        let cardFace = document.getElementById(element.id);
        cardFace.style.backgroundImage = `url(${element.cardFace}`;

        cardFace.addEventListener('click', () => {
            let currentActive = document.querySelector('.ancient-card-active');

            if (currentActive) {                
                currentActive.classList.remove('ancient-card-active');
            }
            
            cardFace.classList.add('ancient-card-active');

            selectAnciant(element);
        });
    });
}

function selectAnciant(element) {
    currentAncient = {};
    Object.assign(currentAncient, element);

    DIFFICLUTY_CONTAINER.style.opacity = '1';
    DIFFICLUTY_CONTAINER.style.pointerEvents = 'auto';

    //DEBUG
    console.log(currentAncient);
}

function selectDifficulty(value) {
    currentDifficult = '';
    currentDifficult = value;

    MIX_BUTTON.style.opacity = '1';
    MIX_BUTTON.style.pointerEvents = 'auto';
    // getCardSet();
    //DEBUG
    console.log(currentDifficult);
}

//Собираем из набора колоды по цветам.
function getCardSet() {
    let greenSum = currentAncient.firstStage.greenCards + currentAncient.secondStage.greenCards + currentAncient.thirdStage.greenCards;
    let blueSum = currentAncient.firstStage.blueCards + currentAncient.secondStage.blueCards + currentAncient.thirdStage.blueCards;
    let brownSum = currentAncient.firstStage.brownCards + currentAncient.secondStage.brownCards + currentAncient.thirdStage.brownCards;
    greenDeck = [];
    blueDeck = [];
    brownDeck = [];
    

    if (currentDifficult == 'very-easy') {
        greenDeck = getVeryEasyDeck(greenCardsData, greenSum);
        blueDeck = getVeryEasyDeck(blueCardsData, blueSum);
        brownDeck = getVeryEasyDeck(brownCardsData, brownSum);
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

    if (currentDifficult == 'very-hard') {
        greenDeck = getVeryHardDeck(greenCardsData, greenSum);
        blueDeck = getVeryHardDeck(blueCardsData, blueSum);
        brownDeck = getVeryHardDeck(brownCardsData, brownSum);
    }

    

   //DEBUG
   console.log(greenDeck); 
   console.log(blueDeck);   
   console.log(brownDeck);
}

function getPhaseSet() {
    getCardSet();

    let firstSum = currentAncient.firstStage.greenCards + currentAncient.firstStage.blueCards + currentAncient.firstStage.brownCards;
    let secondSum = currentAncient.secondStage.greenCards + currentAncient.secondStage.blueCards + currentAncient.secondStage.brownCards;
    let thirdSum = currentAncient.thirdStage.greenCards + currentAncient.thirdStage.blueCards + currentAncient.thirdStage.brownCards;

    let bufferGreen = [].concat(greenDeck);
    let bufferBlue = [].concat(blueDeck);
    let bufferBrown = [].concat(brownDeck);

    firstSet = [];
    secondSet = [];
    thirdSet = [];

    //Выбирем зеленые карты.
    for (let i = 1; i <= currentAncient.firstStage.greenCards; i++) {
        let currentCard = getRandomCard(bufferGreen);
        firstSet.push(currentCard);
    }
    for (let i = 1; i <= currentAncient.secondStage.greenCards; i++) {
        let currentCard = getRandomCard(bufferGreen);
        secondSet.push(currentCard);
    }
    for (let i = 1; i <= currentAncient.thirdStage.greenCards; i++) {
        let currentCard = getRandomCard(bufferGreen);
        thirdSet.push(currentCard);
    }

    //Выбирем синие карты.
    for (let i = 1; i <= currentAncient.firstStage.blueCards; i++) {
        let currentCard = getRandomCard(bufferBlue);
        firstSet.push(currentCard);
    }
    for (let i = 1; i <= currentAncient.secondStage.blueCards; i++) {
        let currentCard = getRandomCard(bufferBlue);
        secondSet.push(currentCard);
    }
    for (let i = 1; i <= currentAncient.thirdStage.blueCards; i++) {
        let currentCard = getRandomCard(bufferBlue);
        thirdSet.push(currentCard);
    }

    //Выбирем коричневые карты.
    for (let i = 1; i <= currentAncient.firstStage.brownCards; i++) {
        let currentCard = getRandomCard(bufferBrown);
        firstSet.push(currentCard);
    }
    for (let i = 1; i <= currentAncient.secondStage.brownCards; i++) {
        let currentCard = getRandomCard(bufferBrown);
        secondSet.push(currentCard);
    }
    for (let i = 1; i <= currentAncient.thirdStage.brownCards; i++) {
        let currentCard = getRandomCard(bufferBrown);
        thirdSet.push(currentCard);
    }

    //DEBUG:
    console.log(`Green card, first set:`);
    console.log(firstSet);
    console.log(`Green card, second set:`);
    console.log(secondSet);
    console.log(`Green card, third set:`);
    console.log(thirdSet);

}

function getGameDeck() {
    getPhaseSet();

    let mixedFirst = mixDeck(firstSet);
    let mixedSecond = mixDeck(secondSet);
    let mixedThird = mixDeck(thirdSet);

    gameDeck = [].concat(mixedThird, mixedSecond, mixedFirst);

    PHASE_CONTAINER.style.opacity = '1';
    DECK_CONTAINER.style.opacity = '1';
    PHASE_CONTAINER.style.pointerEvents = 'auto';
    DECK_CONTAINER.style.pointerEvents = 'auto';

    MIX_BUTTON.style.opacity = '0';
    MIX_BUTTON.style.pointerEvents = 'none';

    UNFLIP_CARD.style.opacity = '1';
    UNFLIP_CARD.style.pointerEvents = 'auto';
    GAME_CARD.style.backgroundImage = `url('')`;
    //DEBUG
    console.log('Итоговый набор:')
    console.log(gameDeck);

}
//Достаём случайную карту из колоды.
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

//Сбор колоды согласно выбранной сложности.
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

    return mixDeck(resultDeck);
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
    return mixDeck(resultDeck);
}
function getMediumDeck(colorCardsData, cardsSum) {
    let resultDeck = [];
    let srcDeck = [].concat(colorCardsData);

    for (let i = 1; i <= cardsSum; i++) {
        let currentCard = getRandomCard(srcDeck);
        resultDeck.push(currentCard);
    }

    return mixDeck(resultDeck);
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
    return mixDeck(resultDeck);
}
function getVeryHardDeck(colorCardsData, cardsSum) {
    let resultDeck = [];
    let srcDeck = [].concat(colorCardsData);

    for (let i = 1; i <= cardsSum; i++) {
        let restCardCount = 0;
        srcDeck.forEach(element => {
            if (element.difficulty == 'hard') {
                restCardCount++;
            }
        });
        let currentCard = restCardCount != 0 ? getRandomCard(srcDeck, 'hard') : getRandomCard(srcDeck, 'normal');
        resultDeck.push(currentCard);
    }

    return mixDeck(resultDeck);
}

//Можем перемешть любую собранную колоду.
function mixDeck(deck) {
    let bufferDeck = [].concat(deck);
    let resultDeck = [];
    let length = bufferDeck.length;

    for (let i = 0; i < length; i++) {
        resultDeck.push(getRandomCard(bufferDeck));
    }

    return resultDeck;
}

function showCard() {
    GAME_CARD.style.backgroundImage = `url('${gameDeck[gameDeck.length - 1]['cardFace']}')`;
    gameDeck.pop();

    if (gameDeck.length == 0) {
        UNFLIP_CARD.style.opacity = '0';
        UNFLIP_CARD.style.pointerEvents = 'none';
    }
}

showAncient();
DIFFICLUTIES_INPUTS.forEach(element => {
    element.addEventListener('input', () => selectDifficulty(element.value));
});

MIX_BUTTON.addEventListener('click', getGameDeck);
UNFLIP_CARD.addEventListener('click', showCard);