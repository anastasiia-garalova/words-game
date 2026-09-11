/*
    TaskDescription → меню / Menü
    gameHandler → выбор игры / Spielauswahl
    GameEndScreen → экран победы/поражения / Sieg-/Niederlagenbildschirm
    main.js → дирижёр / Steuerzentrale
*/

import {TaskDescription} from "./TaskDescription.js"; // Класс меню / Menü-Klasse
import {GameEndScreen} from "./GameEndScreen.js";      // Класс экрана конца игры / Spielende-Bildschirm-Klasse
// game 1
import {showWindowWithCard, blinkInterval} from "./windowwithcards.js"; // Карточная игра / Karten-Spiel
// game 2
import {Tetris} from "./Tetris.js";                                      // Класс Тетриса / Tetris-Klasse
import CardManager from "./CardManager.js";                               // (default export) Менеджер карточек / Karten-Manager
// Имя можно выбрать любое, {} (geschweifte Klammern) здесь не используются
import {CardFunctionality} from "./CardFunctionality.js";                 // Логика работы с карточками / Karten-Funktionalität
import {NewWordsList} from "./NewWordsList.js";                           // Список новых слов / Neue-Wörter-Liste

// User Name / Имя пользователя / Benutzername
let itsMe = location.hash.substring(1);           // Получаем имя из хеша URL / Name aus URL-Hash holen
const userName = document.querySelector("#userName");
userName.textContent = itsMe;                     // Устанавливаем имя на странице / Name auf der Seite setzen

// Контейнеры модального окна и основного блока / Container für Modal- und Hauptbereich
const mainContainer = document.getElementsByClassName("main");
const modalContainer = document.getElementsByClassName("modal");

// Первая страница, которую показываем / Erste Seite, die wir anzeigen
const task = new TaskDescription();  // Menu / Menü

function showMenu() {
    const menuButton = document.getElementById("menu-button");
    menuButton.style.display = "none"; 

    task.showTaskDescription(gameHandler); // Показываем меню / Menü anzeigen
}

const endScreen = new GameEndScreen(showMenu); // Экран конца игры / Spielende-Bildschirm

// Обработчик выбора игры / Spielauswahl-Funktion
function gameHandler(win) {

    // Очищаем основной контейнер и модальное окно / Haupt- und Modal-Container leeren
    mainContainer.innerHTML = "";
    modalContainer.innerHTML = "";

    // Если выбрана игра "game1" / Wenn "game1" gewählt
    if (win === "game1") {
        showWindowWithCard((isEnd) =>{
            if (isEnd === "win")
                endScreen.win("game1");    // Победа / Sieg
            else
                endScreen.lose("game1");   // Поражение / Niederlage
        });

        new CardManager(blinkInterval, showMenu); // Запуск менеджера карточек / Karten-Manager starten
    }

    // Если выбрана игра "tetris" / Wenn "tetris" gewählt
    else if (win === "tetris") {
        const tetris = new Tetris(3, 10, showMenu); // Создаем новый тетрис / Neues Tetris erstellen

        tetris.startTetris((isEnd) => {
            if (isEnd === "win")
                endScreen.win("tetris");    // Победа / Sieg
            else
                endScreen.lose("tetris");   // Поражение / Niederlage
        }).then();
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

    // Если выбрана игра "newWordsADD" / Wenn "newWordsADD" gewählt
    else if (win === "newWordsADD") {
        const workPanel = document.getElementsByClassName("work-panel")[0];
        if (workPanel) {
            workPanel.remove(); // Удаляем старую панель / Alte Arbeitsfläche entfernen
        }

        const newWordsList = new NewWordsList(showMenu);       // Создаем список новых слов / Neue-Wörter-Liste erstellen
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

// Показать меню при старте / Menü beim Start anzeigen
task.showTaskDescription(gameHandler);
