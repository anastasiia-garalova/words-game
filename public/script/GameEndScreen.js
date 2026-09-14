export class GameEndScreen {
    constructor(onMenuClick) {
        this.modalContainer = document.getElementsByClassName("modal")[0];
        this.onMenuClick = onMenuClick;
    }

    win() {
        this.show("Du hast gewonnen! 🎉", "win");
    }

    lose() {
        this.show("Versuche es noch einmal", "lose");
    }

    show(text, state = "") {
        this.modalContainer.innerHTML = "";

        const overlay = document.createElement("div");
        overlay.className = `game-end-overlay ${state}`;

        const message = document.createElement("div");
        message.className = "game-end-message";
        message.textContent = text;

        const mainMenuButton = document.createElement("button");
        mainMenuButton.textContent = "Zum Hauptmenü";

        overlay.append(message, mainMenuButton);
        this.modalContainer.appendChild(overlay);

        mainMenuButton.addEventListener("click", () => {
            this.showMainMenu();
        });
    }

    showMainMenu() {
        this.modalContainer.innerHTML = "";
        this.onMenuClick();
    }
}