"use strict";

class TaskDescription {
    constructor() {

        this._activeWindow = "";
        this._onSelect = null;
        // FENSTER
        // Modal Fencter, in dem wrd ganze Aufgabe heigen
        this.taskContainer  = document.createElement("div");

        // AUFGABE
        // Ein Conteiner in Modal-Fenster, der auf der cetter stehen wird
        this.taskContent = document.createElement("div")
        // H2 - Begrif der Aufgabe
        this.aufgabeTitle = document.createElement("h2");
        // P - Description der Aufgabe
        this.aufgabeDescription = document.createElement("p");
        // Button "Game 1" - aufgabe war verstanden
        this.buttonPlayGame1 = document.createElement("button");
        // Button "Tetris" - aufgabe war verstanden
        this.buttonPlayTetris = document.createElement("button");
        // Button "Neue woerter hinzufuegen" - aufgabe war verstanden
        this.newWordsADD = document.createElement("button");

        // MODEL CONTAINER cards-container mit ID
        this.modalContainer = document.createElement("div");

        // EVENT auf der Button "Game 1"
        // Nur mit ()=> this bleibt von der Class
       this.buttonPlayGame1.addEventListener("click", ()=> {
            this.changeWindow("game1");
            this._onSelect (this._activeWindow);
        });

        // EVENT auf der Button "Tetris"
        this.buttonPlayTetris.addEventListener("click", ()=> {
            console.log("🎯 TETRIS BUTTON CLICK");
            this.changeWindow("tetris");
            this._onSelect (this._activeWindow);
        })

        // EVENT auf der Button "Eigene Wörter lernen"
        this.newWordsADD.addEventListener("click", ()=> {
            this.changeWindow("newWordsADD");
            this._onSelect (this._activeWindow);
        })
    }

    showTaskDescription(onSelect) {
        console.log("📋 SHOW TASK DESCRIPTION");
        this._onSelect = onSelect;
        
        // CLASSER NAMEN
        // von FENSTER
        this.taskContainer.className = "task-container";
        // von AUFGABE
        this.taskContent.className = "task-content";

        // INHALT VON AUFGABE
        this.aufgabeTitle.textContent = "Möchten Sie jetzt spielen?";
        this.buttonPlayGame1.textContent = "Game 1";
        this.buttonPlayTetris.textContent = "Tetris";
        this.newWordsADD.textContent = "Eigene Wörter lernen";
        this.newWordsADD.style.backgroundColor = "orange";

        // Setzen alle Elementen im Conteiner AUFGABE "aufgabemodalContainer"
        this.taskContent.append(this.aufgabeTitle, this.buttonPlayGame1, this.buttonPlayTetris, this.newWordsADD);
        // Setzen das Element AUFGABE im Conteiner FENSTER "aufgabeModal"
        this.taskContainer.appendChild(this.taskContent);

        // Setzen das Element "aufgabeModal" in "document body"
        document.body.appendChild(this.taskContainer);
    }

    changeWindow(newWindow) {
        // DISABLED .modal-content
        this.taskContainer.remove();

        // callback
        this._activeWindow = newWindow;
    }

}

export {TaskDescription};



