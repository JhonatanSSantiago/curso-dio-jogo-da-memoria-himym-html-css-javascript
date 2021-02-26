const cards = document.querySelectorAll('.card');
let hasFlipperCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return; //travar tabuleiro
    if (this === firstCard) return; //duplo clique na mesma carta

    this.classList.add('flip');
    if(!hasFlipperCard) {
        hasFlipperCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipperCard = false;
    checkForMath();
}


function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlipperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();


cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});



