//
// BlackJack
// by Radoslav Tsanev
//

// Card Variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 'Ten',
        'Nine', 'Eight', 'Seven', 'Six', 'Five',
        'Four', 'Three', 'Two'
    ];

// DOM Variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    playerCards = [],
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0,
    deck;

// Hide hit/stay buttons
hitButton.style.display = 'none';
stayButton.style.display = 'none';

// New Game - Button
newGameButton.addEventListener('click', function() {
    gameStarted = true;
    playerWon = false;
    gameOver = false;

    deck = createDeck();
    shuffleDeck();
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();


});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndGame();
    showStatus();
});

stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndGame();
    showStatus();
});

function checkForEndGame() {
    updateScore();

    if (gameOver) {
        // let dealer take cards 
        while (dealerScore < playerScore &&
            playerScore <= 21 &&
            dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScore();
        }
    }

    if (playerScore == 21) {
        playerWon = true;
        gameOver = true;
    } else if (dealerScore == 21) {
        playerWon = false;
        gameOver = true;

    } else if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {

        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }

        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }



}

function createDeck() {

    let deck = [];

    for (let indexSuits = 0; indexSuits < suits.length; indexSuits++) {

        for (let indexValues = 0; indexValues < values.length; indexValues++) {

            let card = {
                suit: suits[indexSuits],
                value: values[indexValues]
            }
            deck.push(card);


        }

    }

    return deck;
}

function shuffleDeck() {

    for (let i = 0; i < deck.length; i++) {

        let swapIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[swapIndex];
        deck[swapIndex] = temp;

    }

    return deck;

}

function getNextCard() {
    return deck.shift();
}



function showStatus() {
    if (!gameStarted) {
        textArea.innerText = 'Welcome to Blackjack!'
    }

    let dealerCardString = '';

    for (let i = 0; i < dealerCards.length; i++) {

        dealerCardString += getCardString(dealerCards[i]) + '\n';

    }

    let playerCardString = '';

    for (let i = 0; i < playerCards.length; i++) {

        playerCardString += getCardString(playerCards[i]) + '\n';

    }

    updateScore();

    textArea.innerText =
        'Dealer has: ' +
        dealerCardString +
        'Score (' + dealerScore + ')\n\n' +

        'Player has: ' +
        playerCardString +
        'Score (' + playerScore + ')\n\n';

    if (gameOver) {

        if (playerWon) {
            textArea.innerText += 'YOU WIN!';
        } else {
            textArea.innerText += 'DEALERS WIN!'
        }

        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }


}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function updateScore() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getCardNumericValue(card) {

    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {

    let score = 0;
    let hasAce = false;

    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);

        if (card.value === 'Ace') {
            hasAce = true;
        }

    }

    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }

    return score;

}