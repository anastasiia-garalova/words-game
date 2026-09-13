class Cards {

    constructor() {
        this.loadCards();
    }

    loadCards() {
        const cardsLocal = JSON.parse(
            localStorage.getItem("listNewWords")
        );

        if (cardsLocal) {
            this._cards = new Map(Object.entries(cardsLocal));
        } else {
            this._cards = new Map([
                ["cat", "кот"],
                ["dog", "собака"],
                ["sun", "солнце"],
                ["ball", "мяч"],
                ["apple", "яблоко"]
            ]);
        }
    }

    get cards() {
        return this._cards;
    }

    set cards(value) {
        this._cards = value;
    }
}

export {Cards};
