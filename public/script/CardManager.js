
class CardManager {

    constructor(blinkInterval, showMenu) {

        const modalContainer = document.getElementsByClassName("modal")[0];
        const menuButton = document.getElementById("menu-button");
        menuButton.style.display = "block"; 
        //console.log("Менеджер карточек запущен / Karten-Manager gestartet");

        menuButton.addEventListener("click", () => {
            modalContainer.innerHTML = "";
            showMenu(); 
        });

        // Conteiner mit Karten
        let cardsContainer = document.getElementById("cards-container");
        if (!cardsContainer) return;
        const cards = cardsContainer.children;
        // Diese Elemente nehmen wir, um zu zeigen, was User machen soll
        // Zwei Letzte Karte
        let firstCard = cards[cards.length - 1];
        let secondCard = cards[cards.length - 2];
        // Style von Borders
        let styleEn = ["3px inset #FFD700", "8px inset #FF4500"];
        let styleDe = ["3px inset #4682B4", "8px inset #00FFFF"];

        this.cardBlicken(blinkInterval.en, firstCard, styleEn);
        this.cardBlicken(blinkInterval.de, secondCard, styleDe);


    }

    cardBlicken(blink, card, styleCard) {

        if (blink === null) {
            // stateDe ist wie ein Starter (Licht auf/einschalten).
            let stateDe = true;

            blink = setInterval(() => {
                if (stateDe) {
                    card.style.border = styleCard[0];
                } else {
                    card.style.border = styleCard[1];
                }
                stateDe = !stateDe;
            }, 500);
        }
    }
}


export default CardManager;




