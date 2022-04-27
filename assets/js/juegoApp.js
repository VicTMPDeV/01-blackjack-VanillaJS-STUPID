/**
 * 2C = 2 of Clubs (Tréboles)
 * 2H = 2 of Hearts (Corazones)
 * 2D = 2 of Diamonds (Diamantes)
 * 2S = 2 of Spades (Espadas)
 * Hit = Pedir carta
 * Stand = Plantarse
 * Deal = Repartir
 */

//Init variables
let deck           = [];
let deckSize       = 0;
const types        = ['C','D','H','S'];
const specialCards = ['A','J','Q','K'];
let playerScore = 0 , computerScore = 0;

//HTML ref variables
const btnHit = document.querySelector('#btnHitCard');
const playerScoreTag = document.querySelector('#playerScoreTag'); 
const computerScoreTag = document.querySelector('#computerScoreTag');
const divPlayerCards = document.querySelector('#player-cards'); 
const divComputerCards = document.querySelector('#computer-cards'); 

const createDeck = () => {
    /*Podría renombrar las cartas del 1 al 13
    para que fuera todo en un único bucle más 
    sencillo, pero por fines didácticos, quiero 
    jugar con el segundo bucle for para ver 
    otra manera de hacerlo.*/
    for (let i=2; i<=10; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }
    for (let type of types) {
        for (let special of specialCards) {
            deck.push(special + type);
        }
    }
    deck = _.shuffle(deck);
    deckSize = deck.length;
    return deck;
}

createDeck();

const hitCard = () => {

    if(deck.length === 0){
        throw 'No quedan más cartas que jugar';
    }
    const card = deck.pop();
    return card;
}

// Test de la función hitCard
// for (let i = 0; i <= deckSize; i++) {
//     hitCard();
// }

const cardValue = (card) => {

    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? ( (value === 'A') ? 11 : 10 ) : parseInt(value);

    /* Legacy Code
    if( isNaN(value) ){ 
        //Los únicos valores posibles son 'A','J','Q' y 'K'
        //En Blackjack 'A' es la única que vale 11 puntos
        points = (value === 'A') ? 11 : 10; 
    }else{
        //El valor numérico es un string, lo convierto a number
        points = parseInt(value);
    }
    */

}

// Eventos (Callback is present... warning)
btnHit.addEventListener('click', () => {

    const hittedCard = hitCard();
    playerScore = playerScore + cardValue(hittedCard);
    playerScoreTag.innerHTML = playerScore;

    //<img class="deck-card" src="assets/cards/2C.png">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${hittedCard}.png`;
    imgCard.classList.add('deck-card')
    divPlayerCards.append(imgCard);

    if(playerScore > 21){
        console.warn('HAS PERDIDO');
        btnHit.disabled = true;
    } else if (playerScore === 21) {
        console.warn('JUGADOR: 21 PUNTOS!!!');
    }

})

