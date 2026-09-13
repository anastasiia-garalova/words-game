/*
    TaskDescription → меню / Menü
    gameHandler → выбор игры / Spielauswahl
    GameEndScreen → экран победы/поражения / Sieg-/Niederlagenbildschirm
    main.js → дирижёр / Steuerzentrale
*/

// Menü-Klasse
import {TaskDescription} from "./TaskDescription.js"; 
// Spielende-Bildschirm-Klasse
import {GameEndScreen} from "./GameEndScreen.js";      
// game 1
// Karten-Spiel
import {showWindowWithCard, blinkInterval} from "./windowwithcards.js"; 
// game 2
// Tetris-Klasse
import {Tetris} from "./Tetris.js";                                      
// Karten-Manager
import CardManager from "./CardManager.js";                               
// Neue-Wörter-Liste             
import {NewWordsList} from "./NewWordsList.js";                           

// User Name / Benutzername
// Name aus URL-Hash holen
let itsMe = location.hash.substring(1);           
const userName = document.querySelector("#userName");

// Name auf der Seite setzen
userName.textContent = itsMe;                     

// Container für Modal- und Hauptbereich
const mainContainer = document.getElementsByClassName("main");
const modalContainer = document.getElementsByClassName("modal");

// Erste Seite, die wir anzeigen
const task = new TaskDescription();  // Menu / Menü

function showMenu() {
    const menuButton = document.getElementById("menu-button");
    menuButton.style.display = "none"; 

    task.showTaskDescription(gameHandler); // Menü anzeigen
}

const endScreen = new GameEndScreen(showMenu); // Spielende-Bildschirm

// Spielauswahl-Funktion
function gameHandler(win) {

    // Haupt- und Modal-Container leeren
    mainContainer.innerHTML = "";
    modalContainer.innerHTML = "";

    // Wenn "game1" gewählt
    if (win === "game1") {
        showWindowWithCard((isEnd) =>{
            if (isEnd === "win")
                endScreen.win("game1");    // Победа / Sieg
            else
                endScreen.lose("game1");   // Поражение / Niederlage
        });

        // Karten-Manager starten
        new CardManager(blinkInterval, showMenu); 
    }

    // Wenn "tetris" gewählt
    else if (win === "tetris") {
        // Neues Tetris erstellen
        const tetris = new Tetris(3, 10, showMenu); 

        tetris.startTetris((isEnd) => {
            if (isEnd === "win")
                endScreen.win("tetris");    // Победа / Sieg
            else
                endScreen.lose("tetris");   // Поражение / Niederlage
        });
    }

    else if (win === "speak") {
        const tetris = new Tetris(3, 10, showMenu); // Создаем новый тетрис / Neues Tetris erstellen
        const peaker = new WordSpeaker();

        tetris.startTetris((isEnd) => {
            if (isEnd === "win")
                endScreen.win("tetris");    // Победа / Sieg
            else
                endScreen.lose("tetris");   // Поражение / Niederlage
        }).then();
    }

    // Wenn "newWordsADD" gewählt
    else if (win === "newWordsADD") {
        const workPanel = document.getElementsByClassName("work-panel")[0];
        if (workPanel) {
            workPanel.remove(); // Удаляем старую панель / Alte Arbeitsfläche entfernen
        }

        const newWordsList = new NewWordsList(showMenu);   
        // Neue-Wörter-Liste erstellen
        newWordsList.createTableWithWords();           // Таблица слов / Tabelle mit Wörtern
        newWordsList.createTableWithBtnAdd((play) => { // Кнопка "добавить" и запуск игры / "Add"-Button und Spiel starten
            if (play) {
                const workPanel = document.getElementsByClassName("work-panel")[0];
                if (workPanel) {
                    workPanel.remove(); // Удаляем рабочую панель / Arbeitsfläche entfernen
                }

                showWindowWithCard((isEnd) =>{
                    if (isEnd === "win")
                        endScreen.win("");    // Победа / Sieg
                    else
                        endScreen.lose("");   // Поражение / Niederlage
                });
                new CardManager(blinkInterval, showMenu); // Менеджер карточек / Karten-Manager
            }
        });
    }
}

// Menü beim Start anzeigen
task.showTaskDescription(gameHandler);
