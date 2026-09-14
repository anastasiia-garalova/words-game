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
const task = new TaskDescription();  

function showMenu() {
    const menuButton = document.getElementById("menu-button");
    menuButton.style.display = "none"; 

    task.showTaskDescription(gameHandler); 
}

const endScreen = new GameEndScreen(showMenu); 

// Spielauswahl-Funktion
function gameHandler(win) {

    // Haupt- und Modal-Container leeren
    mainContainer.innerHTML = "";
    modalContainer.innerHTML = "";

    // Wenn "game1" gewählt
    if (win === "game1") {
        showWindowWithCard((isEnd) =>{
            if (isEnd === "win")
                endScreen.win("game1");    
            else
                endScreen.lose("game1");   
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
                endScreen.win("tetris");    
            else
                endScreen.lose("tetris");  
        });
    }

    else if (win === "speak") {
        const tetris = new Tetris(3, 10, showMenu); 
        const peaker = new WordSpeaker();

        tetris.startTetris((isEnd) => {
            if (isEnd === "win")
                endScreen.win("tetris");    
            else
                endScreen.lose("tetris");   
        }).then();
    }

    // Wenn "newWordsADD" gewählt
    else if (win === "newWordsADD") {
        const workPanel = document.getElementsByClassName("work-panel")[0];
        if (workPanel) {
            workPanel.remove(); 
        }

        const newWordsList = new NewWordsList(showMenu);   
        // Neue-Wörter-Liste erstellen
        newWordsList.createTableWithWords();           
        newWordsList.createTableWithBtnAdd((play) => { 
            if (play) {
                const workPanel = document.getElementsByClassName("work-panel")[0];
                if (workPanel) {
                    workPanel.remove(); 
                }

                showWindowWithCard((isEnd) =>{
                    if (isEnd === "win")
                        endScreen.win("");    
                    else
                        endScreen.lose("");   
                });
                new CardManager(blinkInterval, showMenu); 
            }
        });
    }
}

// Menü beim Start anzeigen
task.showTaskDescription(gameHandler);
