function inicio() {
    $(".start").hide();
    $(".card").show();

    const cards = document.querySelectorAll('.card');
    let cont = cards.length;
    let hasFlipperCard = false; //verifica se tem cartao selecionado
    let firstCard, secondCard;
    let lockBoard = false;

    function flipCard() { //revela imagem da carta
        
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

    function checkForMath() { //verifica se cartas sao identicas
        if(firstCard.dataset.card === secondCard.dataset.card){
            cont -=2;
            console.log(cont);
            disableCards(); // chama metodo desativar cartas
            return;
        }
        unflipCards(); //chama metodo mostra fundo das cartas
    }

    function disableCards(){ //desativar cartas
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() { //mostra fundo da carta
        lockBoard = true; //trava tabuleiro
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);       
    } 

    function resetBoard() { //renicia tabuleiro
        if(cont <= 0){
            alert("Parabens!! Click em Ok para Jogar Novamente");
            window.location.reload();
        } 
        [hasFlipperCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() { //embaralhar cartas
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12);
            card.style.order = randomPosition;
        })
    })();


    cards.forEach((card) => { //define carta clicada
        card.addEventListener('click', flipCard)
    });
}
