import {Cards} from './Cards.js';

let blinkInterval = {
    en: null,
    de: null
};

function showWindowWithCard(onEnd) {

    let cardsMap = new Cards().cards;
    const cards = Object.fromEntries(cardsMap);

    const modalContainer = document.getElementsByClassName("modal")[0];
    modalContainer.innerHTML = "";
        // ID NAME
    modalContainer.id = "cards-container";

    // Setzen das Element "modalContainer" in "document body"
    //document.body.appendChild(modalContainer);
    //mainContainer.appendChild(modalContainer);

    let hasIntersectedAny = false;       // пересечение с любым объектом
    let hasIntersectedCorrect = false;   // пересечение с объектом с тем же id

    const usedAreas = [];
    let index = 0;
    let cardCount = 0;

    for (let cardsKey in cards) {
        cardCount += 2;

        const cardDivEn = document.createElement("div");
        const cardDivDe = document.createElement("div");

        cardDivEn.id = `${index}`;
        cardDivDe.id = `${index}`;
        index++;

        cardDivEn.className = "card-en";
        cardDivDe.className = "card-de";

        cardDivEn.style.position = "absolute";
        cardDivDe.style.position = "absolute";

        cardDivEn.textContent = cardsKey;
        cardDivDe.textContent = cards[cardsKey];

        // Zuerst fügen wir hinzu – damit die Abmessungen erscheinen
        modalContainer.appendChild(cardDivEn);
        modalContainer.appendChild(cardDivDe);

        // Nun positionieren wir ohne Überschneidungen
        placeWithoutOverlap(cardDivEn, modalContainer, usedAreas);
        placeWithoutOverlap(cardDivDe, modalContainer, usedAreas);

        //modalContainer.append(cardDivEn, cardDivDe);

        let offsetX, offsetY;
        let isDown = false;
        let sprache = "";
        let hasIntersected = false;   // отслеживаем факт пересечения

        let allEnCards = [];
        let allDeCards = [];
        allEnCards.push(cardDivEn);
        allDeCards.push(cardDivDe);

        // 1. Нажали мышь
        cardDivEn.addEventListener("mousedown", (e) => {
            isDown = true;
            sprache = "en";
            cardDivEn.style.cursor = "grabbing";

            cardDivEn.style.border = "8px inset #FFD700";

            offsetX = e.clientX - cardDivEn.offsetLeft;
            offsetY = e.clientY - cardDivEn.offsetTop;

            if (blinkInterval.de !== null) {
                clearInterval(blinkInterval.de);
                blinkInterval.de = null;
            }
        });

        // 1. Нажали мышь
        cardDivDe.addEventListener("mousedown", (e) => {
            isDown = true;
            sprache = "de";
            cardDivDe.style.cursor = "grabbing";

            cardDivDe.style.border = "8px inset #00FFFF";

            offsetX = e.clientX - cardDivDe.offsetLeft;
            offsetY = e.clientY - cardDivDe.offsetTop;

            if (blinkInterval.en !== null) {
                clearInterval(blinkInterval.en);
                blinkInterval.en = null;
            }

        });

        // 2. Двигаем мышь
        document.addEventListener("mousemove", (e) => {
            if (!isDown) return;

            let activeCard = sprache === "en" ? cardDivEn : cardDivDe;
            let oppositeList = sprache === "en" ? allDeCards : allEnCards;

            activeCard.style.left = (e.clientX - offsetX) + "px";
            activeCard.style.top = (e.clientY - offsetY) + "px";

            activeCard.currentTarget = null; // очищаем прошлое соприкосновение

            const activeRect = activeCard.getBoundingClientRect();

            // проверяем пересечение с каждым элементом
            oppositeList.forEach(other => {
                const otherRect = other.getBoundingClientRect();

                const isIntersecting =
                    activeRect.left < otherRect.right &&
                    activeRect.right > otherRect.left &&
                    activeRect.top < otherRect.bottom &&
                    activeRect.bottom > otherRect.top;

                if (isIntersecting) {
                    // подсветка как в LearningApps
                    activeCard.style.border = "4px solid orange";
                    other.style.border = "4px solid orange";

                    // сохраняем, кто именно соприкоснулся
                    activeCard.currentTarget = other;
                } else {
                    other.style.border = "";
                }
            });
        });

        // 3. Отпустили мышь
        document.addEventListener("mouseup", () => {
            if (!isDown) return;
            isDown = false;

            let activeCard = sprache === "en" ? cardDivEn : cardDivDe;
            let target = activeCard.currentTarget;

            if (target && activeCard.id === target.id) {
                // Rihtige Paar loeschen /правильная пара → исчезают
/*                activeCard.style.display = "none";
                target.style.display = "none";*/
                activeCard.remove();
                target.remove();
                cardCount -= 2;

                console.log("cardCount: ", cardCount);
                if (cardCount === 0) {
                   // modalContainer.remove();

                    //modalContainer.innerHTML = "";
                    onEnd("win");   // <<< Rufen CALLBACK
                }
            }

            // очистка подсветок
            allEnCards.forEach(card => card.style.border = "");
            allDeCards.forEach(card => card.style.border = "");
        });

    }

    // Positionieren ohne Überschneidungen (без пересечения)
    function placeWithoutOverlap(element, container, usedAreas) {
        const containerRect = container.getBoundingClientRect();
        const elemWidth = element.offsetWidth;
        const elemHeight = element.offsetHeight;

        let left, top;
        let fits = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!fits && attempts < maxAttempts) {
            left = Math.random() * (containerRect.width - elemWidth);
            top = Math.random() * (containerRect.height - elemHeight);

            const newArea = { left, top, right: left + elemWidth, bottom: top + elemHeight };

            const overlap = usedAreas.some(a =>
                !(newArea.right < a.left || newArea.left > a.right ||
                    newArea.bottom < a.top || newArea.top > a.bottom)
            );

            if (!overlap) {
                usedAreas.push(newArea);
                fits = true;
            }
            attempts++;
        }

        if (!fits) { // Wenn nicht genügend Platz vorhanden ist, platzieren wir es nach dem Zufallsprinzip.
            left = Math.random() * (containerRect.width - elemWidth);
            top = Math.random() * (containerRect.height - elemHeight);
        }

        element.style.left = left + "px";
        element.style.top = top + "px";
    }
}

export {showWindowWithCard, blinkInterval};








