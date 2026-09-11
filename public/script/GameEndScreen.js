export class GameEndScreen {
    constructor(onMenuClick) {
        this.modalContainer = document.getElementsByClassName("modal")[0];
        this.onMenuClick = onMenuClick;
    }

    win(gameName) {
        return this.show("Du hast gewonnen! 🎉", "win", gameName);
    }

    lose(gameName) {
        return this.show("Versuche es noch einmal", "lose", gameName);
    }

    show(text, state = "", gameName) {
        let redirectTo = "";
        this.modalContainer.innerHTML = "";

        const overlay = document.createElement("div");
        overlay.className = `game-end-overlay ${state}`;

        const message = document.createElement("div");
        message.className = "game-end-message";
        message.textContent = text;

        const buttonHauptMenu = document.createElement("button");
        buttonHauptMenu.textContent = "Zum Hauptmenü";

        overlay.append(message, buttonHauptMenu);
        this.modalContainer.appendChild(overlay);

        // Переход в меню
        buttonHauptMenu.addEventListener("click", this.showHauptMenu.bind(this));
    }

    showHauptMenu() {
        this.modalContainer.innerHTML = "";
        this.onMenuClick();
    }
}
