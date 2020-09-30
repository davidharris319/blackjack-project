/* Blackjack game flow

* User enters player name.
* User is asked how much they would like to bet.
* User enters bet amount.
* User receives two cards.
* User asks if they would like to hit or stand.
* If User clicks hit button, receive another card. User is asked again.
* If User clicks stand button, Dealers cards are revealed. Closest to 21 wins.
* If player wins, they get receive double what they bet.
* If player loses, the lose what they bet. 
* Play again?

*/


/*----- constants -----*/

const deck = [];

// populate card deck
let cards = function() {
    let suits = ['d', 'h', 's', 'c'];
    for (i = 0; i < suits.length; i++) {
        let cards = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'];
        for (j = 0; j < cards.length; j++) {
            deck.push(suits[i] + cards[j]);
        }
    }
}


/*----- app's state (variables) -----*/

let money = 100;
let playerCards = [];
let dealerCards =[];
let playerBet;

cards();
moneyElement();

/*----- cached element references -----*/

function moneyElement() {
    document.getElementById('money-left').innerHTML = money;
}

/*----- event listeners -----*/

document.querySelector('#dealButton').addEventListener('click', dealHand);
/*----- functions -----*/

function init() {
    playerCards = [];
    dealerCards = [];
    playerBet();
}

function dealHand() {
    let randomCard = [];
    for (i = 0; i < 4; i++)
        randomCard[i] = deck.splice(Math.floor(Math.random() * deck.length), 1)
        if (playerCards[0] === undefined) {
            playerCards.push(randomCard);
        } else {
            dealerCards.push(randomCard);
        }
    
    console.log(playerCards);
    
}