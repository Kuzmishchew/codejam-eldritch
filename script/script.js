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
const ANCIENT_COMMAND = document.querySelector('.ancient-command');

const FIRST_PHASE = document.querySelector('.first-phase');
const SECOND_PHASE = document.querySelector('.second-phase');
const THIRD_PHASE = document.querySelector('.third-phase');

const LARGE_CARD = document.querySelector('.rised-card');
const EYE = document.querySelectorAll('.eye');

let currentAncient = {};
let currentDifficult = '';

let greenDeck = [];
let blueDeck = [];
let brownDeck = [];

let firstSet = [];
let secondSet = [];
let thirdSet = [];

let mixedFirst = [];
let mixedSecond = [];
let mixedThird = [];

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

    MIX_BUTTON.style.opacity = '0';
    MIX_BUTTON.style.pointerEvents = 'none';

    PHASE_CONTAINER.style.opacity = '0';
    PHASE_CONTAINER.style.pointerEvents = 'none';

    DECK_CONTAINER.style.opacity = '0';
    DECK_CONTAINER.style.pointerEvents = 'none';

    ANCIENT_COMMAND.style.display = "none";

    //DEBUG
    console.log(`?????????????????? ??????????????: ${currentAncient.name}`);
    console.log('???????????????????? ???????? ???? ??????????????:');
    console.log(`1. ?????? - ${currentAncient.firstStage.greenCards}; ?????? - ${currentAncient.firstStage.brownCards}; ?????? - ${currentAncient.firstStage.blueCards}`);
    console.log(`2. ?????? - ${currentAncient.secondStage.greenCards}; ?????? - ${currentAncient.secondStage.brownCards}; ?????? - ${currentAncient.secondStage.blueCards}`);
    console.log(`3. ?????? - ${currentAncient.thirdStage.greenCards}; ?????? - ${currentAncient.thirdStage.brownCards}; ?????? - ${currentAncient.thirdStage.blueCards}`);
}

function selectDifficulty(value) {
    currentDifficult = '';
    currentDifficult = value;

    DIFFICLUTIES_INPUTS.forEach(element => {
        let label = element.parentNode;
        if (currentDifficult == element.value) {
            label.style.color = 'yellow';
        } else {
            label.style.color = 'white';
        }
    });
    MIX_BUTTON.style.opacity = '1';
    MIX_BUTTON.style.pointerEvents = 'auto';

    //DEBUG
    console.log(`C????????????????: ${currentDifficult}`);
}

//???????????????? ???? ???????????? ???????????? ???? ????????????.
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

    //?????????????? ?????????????? ??????????.
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

    //?????????????? ?????????? ??????????.
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

    //?????????????? ???????????????????? ??????????.
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
}

function getGameDeck() {
    getPhaseSet();

    mixedFirst = mixDeck(firstSet);
    mixedSecond = mixDeck(secondSet);
    mixedThird = mixDeck(thirdSet);


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

    FIRST_PHASE.parentNode.classList.add('phase-tracker-active');

    GAME_CARD.style.boxShadow = '';
    GAME_CARD.style.opacity = '0';
    GAME_CARD.style.pointerEvents = 'none';

    trackCard();

    //DEBUG:
    console.log(`?????????????? ????????????????, ???????????????????????????? ???????????? ?????? ???????????? ????????????:`);
    console.log(`- ???????????? ????????????`);
    console.log(mixedFirst);
    console.log(`- ???????????? ????????????`);
    console.log(mixedSecond);
    console.log(`- ???????????? ????????????`);
    console.log(mixedThird);
    //DEBUG
    console.log('???????????????? ??????????, ?? ?????????????? ?????????? ?????????? ?????????????????? ?? ??????????.');
    console.log('???????????? ?? ???????????????? ??????????????. ??.??. ?? ?????????? ?????????????? - ???????????? ????????????.');
    console.log(gameDeck);

}
//?????????????? ?????????????????? ?????????? ???? ????????????.
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

//???????? ???????????? ???????????????? ?????????????????? ??????????????????.
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

//?????????? ?????????????????? ?????????? ?????????????????? ????????????.
function mixDeck(deck) {
    let bufferDeck = [].concat(deck);
    let resultDeck = [];
    let length = bufferDeck.length;

    for (let i = 0; i < length; i++) {
        resultDeck.push(getRandomCard(bufferDeck));
    }

    return resultDeck;
}

function getCardSum(deck) {
    let result = {
        green: 0,
        brown: 0,
        blue: 0
    }

    deck.forEach((value) => {
        result[value.color]++;
    });

    return result;
}

//?????????????????????? ?????????????? ?????????????????? ????????????.
function trackCard() {
    let trackFirst = getCardSum(mixedFirst);
    let trackSecond = getCardSum(mixedSecond);
    let trackThird = getCardSum(mixedThird);

    FIRST_PHASE.querySelector('.phase-green').textContent = trackFirst.green;
    FIRST_PHASE.querySelector('.phase-brown').textContent = trackFirst.brown;
    FIRST_PHASE.querySelector('.phase-blue').textContent = trackFirst.blue;

    SECOND_PHASE.querySelector('.phase-green').textContent = trackSecond.green;
    SECOND_PHASE.querySelector('.phase-brown').textContent = trackSecond.brown;
    SECOND_PHASE.querySelector('.phase-blue').textContent = trackSecond.blue;

    THIRD_PHASE.querySelector('.phase-green').textContent = trackThird.green;
    THIRD_PHASE.querySelector('.phase-brown').textContent = trackThird.brown;
    THIRD_PHASE.querySelector('.phase-blue').textContent = trackThird.blue;
}

function showCard() {
    GAME_CARD.style.backgroundImage = `url('${gameDeck[gameDeck.length - 1]['cardFace']}')`;
    GAME_CARD.style.boxShadow = `5px 5px 25px ${gameDeck[gameDeck.length - 1]['color']}`;
    GAME_CARD.style.backgroundColor = `${gameDeck[gameDeck.length - 1]['color']}`;
    GAME_CARD.style.opacity = '1';
    GAME_CARD.style.pointerEvents = 'auto';

    gameDeck.pop();

    if (mixedFirst.length > 0) {
        mixedFirst.pop();
        trackCard();
    } else if (mixedSecond.length > 0) {
        mixedSecond.pop();
        trackCard();
        FIRST_PHASE.parentNode.classList.remove('phase-tracker-active');
        SECOND_PHASE.parentNode.classList.add('phase-tracker-active');
    } else if (mixedThird.length > 0) {
        mixedThird.pop();
        trackCard();
        SECOND_PHASE.parentNode.classList.remove('phase-tracker-active');
        THIRD_PHASE.parentNode.classList.add('phase-tracker-active');
    }
        
    

    if (gameDeck.length == 0) {
        UNFLIP_CARD.style.opacity = '0';
        UNFLIP_CARD.style.pointerEvents = 'none';

        MIX_BUTTON.style.opacity = '1';
        MIX_BUTTON.style.pointerEvents = 'auto'; 
        MIX_BUTTON.textContent = "???????????????? ?????????? ????????????";   

        THIRD_PHASE.parentNode.classList.remove('phase-tracker-active');
    }
}

function showLargeCard(card) {
    event.stopPropagation();
    LARGE_CARD.style.backgroundImage = card.style.backgroundImage;
    LARGE_CARD.parentNode.style.display = 'flex';
    LARGE_CARD.parentNode.addEventListener('click', () => {
        LARGE_CARD.parentNode.style.display = 'none';
    })
}

showAncient();

DIFFICLUTIES_INPUTS.forEach(element => {
    let label = element.parentNode;
    label.addEventListener('click', () => {
        selectDifficulty(element.value);
    });
});

MIX_BUTTON.addEventListener('click', getGameDeck);

UNFLIP_CARD.addEventListener('click', showCard);

EYE.forEach(element => {
    let card = element.parentNode;
    element.addEventListener('click', () => {
        showLargeCard(card);
    });    
})