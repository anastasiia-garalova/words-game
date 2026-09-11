class CardFunctionality {
    constructor() {
        this.listCardsEn = document.querySelectorAll("#cards-container .card-en");
        this.listCardsDe = document.querySelectorAll("#cards-container .card-de");

        this.showCards(this.listCardsEn, "en");
        this.showCards(this.listCardsDe, "de");
    }

    showCards(cards, lang) {
        cards.forEach((card) => {
            this.clickMausDown(card, lang);
        })
    }

    clickMausDown(card, lang) {
        card.addEventListener("mousedown", (event) => {
            console.log();
        });
    }
}

export {CardFunctionality};