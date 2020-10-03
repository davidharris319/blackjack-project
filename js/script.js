/* Blackjack game flow

* User is asked how much they would like to bet.
* User enters bet amount.
* User receives two cards.
* User asks if they would like to hit or stand.
* If User clicks hit button, receive another card. User is asked again.
* If User clicks stand button, Dealers cards are revealed. Closest to 21 wins.
* If player wins, they get receive double what they bet.
* If player loses, they lose what they bet. 
* Play again?

*/

/*----- app's state (variables) -----*/
let money = 100;
let deck = [];
let playerCards = [];
let dealerCards = [];
let playerBet = 0;
let playerCount = 0;
let dealerCount = 0;


moneyElement();

/*----- cached element references -----*/
function moneyElement() {
    document.getElementById('money-left').innerText = `Playing Money: $${money}`;
}

function betElement() {
    document.getElementById('submittedBet').innerHTML = `Bet amount: $${playerBet}`;
}

/*----- event listeners -----*/
document.querySelector('#dealButton').addEventListener('click', dealHand);
document.querySelector('#betButton').addEventListener('click', makeBet);
document.querySelector('#clearButton').addEventListener('click', clearBet);
document.querySelector('#hitButton').addEventListener('click', playerTakeCard);
document.querySelector('#playAgain').addEventListener('click', playAgain)
document.querySelector('#standButton').addEventListener('click', stand);
/*----- functions -----*/

function init() {
    playerCards = [];
    dealerCards = [];
    playerCount = 0;
    dealerCount = 0;
    playerBet = 0;
    moneyElement();
    betElement();
    $('.playing-card, .message').remove();
    resetDeck();
}

// populate card deck
function resetDeck() {
    deck = [];
    let suits = ['d', 'h', 's', 'c'];
    for (i = 0; i < suits.length; i++) {
        let cards = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'];
        for (j = 0; j < cards.length; j++) {
            deck.push(suits[i] + cards[j]);
        }
    }
}

function shuffleDeck() {
    let count = deck.length;
    while(count) {
        deck.push(deck.splice(Math.floor(Math.random() * count), 1) [0]);
        count -= 1;
    }
}

function makeBet() {
    playerBet = document.querySelector('#betAmount').value
    if (playerBet <= money && playerBet > 0) {
        betElement();
        $('#clearButton, #dealButton, .form-inline').toggle();
    } else {
        console.log('error');
    }
}

function clearBet() {
    playerBet = 0;
    betElement();
    document.querySelector('#betAmount').value = 'Enter Bet Amount';
    document.getElementById('submittedBet').innerHTML = '';
    moneyElement();
    $('#clearButton, #dealButton, .form-inline').toggle();
}

function dealHand() {
    shuffleDeck()

    let nextCard = [];
    for (i = 0; i < 2; i++) {
        nextCard = deck.pop()
        playerCards.push(nextCard);
    }
        
    for (i = 0; i < 2; i++) {
        nextCard = deck.pop()
        dealerCards.push(nextCard);
    }

    $('.playerCards').append(`<div class="playing-card ${playerCards[0]}"></div>`);
    $('.playerCards').append(`<div class="playing-card ${playerCards[1]}"></div>`);

    $('.dealerCards').append(`<div class="playing-card ${dealerCards[0]}"></div>`);
    $('.dealerCards').append(`<div class="playing-card back-blue" id="face-down-card"></div>`);

    $('#clearButton, #dealButton, .game-button').toggle();
    updateCounts();
}

function updateCounts() {
    playerCount = getHandValue("player");
    dealerCount = getHandValue("dealer");

    console.log(`player count ${playerCount}`);
    console.log(`dealer count ${dealerCount}`);

    playerBust();
    console.log("number a");
}

function getHandValue(playerType) {
    let hand = playerType === "dealer" ? dealerCards : playerCards;
    let count = 0;
    sortAces(hand); 

    hand.forEach(function(card) {
        if (card.split('').includes('A') && count < 11) {
            count += 11;
        } else if (card.split('').includes('A') && count > 11) {
            count += 1;
        } else if (card.split('').includes('2')) {
            count += 2;
        } else if (card.split('').includes('3')) {
            count += 3;
        } else if (card.split('').includes('4')) {
            count += 4;
        } else if (card.split('').includes('5')) {
            count += 5;
        } else if (card.split('').includes('6')) {
            count += 6;
        } else if (card.split('').includes('7')) {
            count += 7;
        } else if (card.split('').includes('8')) {
            count += 8;
        } else if (card.split('').includes('9')) {
            count += 9;
        } else if (card.split('').includes('1')) {
            count += 10;
        } else if (card.split('').includes('J')) {
            count += 10;
        } else if (card.split('').includes('Q')) {
            count += 10;
        } else if (card.split('').includes('K')) {
            count += 10;
        }
    });
    return count;
}

function sortAces(hand) {
    for(i = 0; i < hand.length; i++) {
        if(hand[i].charAt(hand[i].length - 1) === "A") {
            hand.push(hand.splice(i, 1) [0]);
        }
    }
}

function playerTakeCard() {
    nextCard = deck.pop()
    playerCards.push(nextCard);
    $('.playerCards').append(`<div class="playing-card ${playerCards[playerCards.length - 1]}"></div>`);
    updateCounts();
}

function stand() {
    dealerHand();
    scoreGame();
    $('.game-button, #playAgain').toggle();
}

function dealerHand() {
    // reveals face down card
    document.getElementById("face-down-card").className = `playing-card ${dealerCards[1]}`;
    // dealer takes card if count lower than 17
    if (dealerCount < 17) {
        dealerTakeCard();
    }
}

function dealerTakeCard() {
    nextCard = deck.pop()
    dealerCards.push(nextCard);
    $('.dealerCards').append(`<div class="playing-card ${dealerCards[dealerCards.length - 1]}"></div>`);
    dealerCount = getHandValue("dealer");
    console.log(`dealer count ${dealerCount}`);
    if (dealerCount < 17) {
        dealerTakeCard();
    }
}

function scoreGame() {
    if (dealerCount > 21 && playerCount < 22) {
        winBet();
        $('blockquote').append(`<p class="mb-0 message">Dealer Busts! You win $${playerBet}.</p>`);
    } else if (dealerCount > 16 && playerCount < 22 && dealerCount < playerCount) {
        winBet();
        $('blockquote').append(`<p class="mb-0 message">You beat the dealer! You win $${playerBet}.</p>`);
    } else if (dealerCount > 16 && playerCount < 22 && dealerCount > playerCount) {
        loseBet();
        $('blockquote').append(`<p class="mb-0 message">You lost to the dealer! You lose $${playerBet}.</p>`);
    } else if (dealerCount === playerCount) {
        $('blockquote').append(`<p class="mb-0 message">It's a draw. Take your money back.</p>`);
    }
}

function playerBust() {
    if (playerCount > 21) {
        loseBet();
        $('blockquote').append(`<p class="mb-0 message">You Busted! You lose $${playerBet}.</p>`);
        dealerHand();
        $('.game-button, #playAgain').toggle();
    } else {
        return;
    }
}

function loseBet() {
    money -= playerBet;
    moneyElement();
}

function winBet() {
    money += parseInt(playerBet);
    moneyElement();
}

function playAgain() {
    $('.form-inline, #playAgain').toggle();
    init();
}

init();