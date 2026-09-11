class NewWordsList {
    constructor(showMenu) {

        const modalContainer = document.getElementsByClassName("modal")[0];
        const menuButton = document.getElementById("menu-button");
        menuButton.style.display = "block"; 
        console.log("Менеджер карточек запущен / Karten-Manager gestartet");

        menuButton.addEventListener("click", () => {
            modalContainer.innerHTML = "";
            showMenu(); // Вызываем функцию showMenu / Rufen Sie die Funktion showMenu auf
        });

        const stored = localStorage.getItem("listNewWords");

        if( stored ) {
            this.listNewWords = JSON.parse(stored);
            console.log(this.listNewWords);
        }else{
            this.listNewWords = {};
        }

        // ID für Element - tr: löschen, koregieren
        this.buttonID = 0;

        //this.mainContainer = document.getElementsByClassName("main")[0];

        // Position Center -> .task-content
        //this.workPanel = document.createElement("div");
        this.modalContainer = document.getElementsByClassName("modal")[0];


        this.workPanel = document.createElement("div");
        this.workPanel.classList.add("work-panel");

        // Tabele
        this.tableContainer = document.createElement("table");
        this.tableADD = document.createElement("table");
        // ID
        this.tableContainer.id = "tableContainer";
        this.tableADD.id = "tableADD";

        // Text Error
        this.errorP = document.createElement("p");
        this.errorP.style.color = "red";

        /*this.createTableWithWords();
        this.createTableWithBtnAdd();*/
    }

    // Tabele mit neuen Wörter
    createTableWithWords() {

        // TABLE erstellen

        // STYLE von Table
        this.tableContainer.style.width = "100%";
        this.tableContainer.style.height = "100%";
        this.tableContainer.style.fontSize = "20px";

        // 1. ROW
        const titleTr = document.createElement("tr");
        const enTitleTd = document.createElement("td");
        const deTitleTd = document.createElement("td");
        const btnTitleDeleteTd = document.createElement("td");
        const btnTitleEditTd = document.createElement("td");

        enTitleTd.textContent = "Englisch Wort";
        deTitleTd.textContent = "Deutsch Wort";

        titleTr.style.fontWeight = "bold";

        titleTr.append(enTitleTd, deTitleTd, btnTitleDeleteTd, btnTitleEditTd);

        this.tableContainer.append(titleTr);

        this.workPanel.append(this.tableContainer, );
        this.modalContainer.appendChild(this.workPanel);
    }

    // Tabele mit input, um neue Wörter hinzufügen
    createTableWithBtnAdd(startGame) {

        this.tableADD.style.width = "100%";
        this.tableADD.style.height = "100%";
        this.tableADD.style.marginTop = "20px";


        // ADD Table addTableTr

        const trTableADD = document.createElement("tr");
        const td1TableADD = document.createElement("td");
        const td2TableADD = document.createElement("td");
        const td3TableADD = document.createElement("td");
        const td4TableADD = document.createElement("td");

        //
        const inputEn = document.createElement("input");
        const inputDe = document.createElement("input");
        const btnAdd = document.createElement("button");
        const btnEdit = document.createElement("button");
        const btnPlay = document.createElement("button");

        btnAdd.textContent = "Hinzufügen";
        // Aenderung speihern
        btnEdit.textContent = "Speihern";
        btnEdit.style.display = "none";
        btnPlay.textContent = "Start";
        btnPlay.style.display = "none";

        btnPlay.style.backgroundColor = "#FF0000";
        inputEn.style.fontSize = "18px";
        inputDe.style.fontSize = "18px";

        td1TableADD.appendChild(inputEn);
        td2TableADD.appendChild(inputDe);
        td3TableADD.append(btnAdd, btnEdit);
        td4TableADD.appendChild(btnPlay);
        trTableADD.append(td1TableADD, td2TableADD, td3TableADD, td4TableADD);
        this.tableADD.appendChild(trTableADD);

        this.workPanel.append(this.tableADD);
        this.modalContainer.appendChild(this.workPanel);

        btnAdd.addEventListener("click", ()=>{
            const enWord = inputEn.value;
            const deWord = inputDe.value;

            this.addNewWord(enWord, deWord, btnPlay, true);

            inputEn.value = "";
            inputDe.value = "";
        });

        // Woerter erstellen von LOCALSTORAGE
        if (this.listNewWords) {

            const keys = Object.keys(this.listNewWords);

            for (const key of keys) {
                const enWord = key;
                const deWord = this.listNewWords[key];
                this.addNewWord(enWord, deWord, btnPlay, false);
            }

        }

        btnPlay.addEventListener("click", (event)=>{
            const taskContent = document.querySelectorAll(".task-content ");

            if (taskContent.length > 0) {
                console.log("Hallo taskContent");
                taskContent.forEach(div => {
                    div.style.display = "none";
                });
            }

            startGame(true);

        });
    }

    // Prüfung ist in einem Wort drei mal eine Buchstabe geschrieben
    hasTripleLetters(word) {
        return /(.)\1\1/.test(word);  // три одинаковых символа подряд
    }

    // Prüfung gibt die Wörter einige Zahl
    hasDigits(word) {
        return /\d/.test(word);
    }

    addNewWord(enWord, deWord, btnPlay, newWord) {

        if (newWord && (this.listNewWords && enWord in this.listNewWords || deWord in this.listNewWords) ) {

            this.errorP.innerHTML = `Solche Wörter <b>\"${enWord}\"</b> oder <b>\"${deWord}\"</b> ist schon im Tabele!`;

            this.tableADD.appendChild(this.errorP);
            return;
        }else if (newWord && (!enWord || enWord.trim() === "" || !deWord || deWord.trim() === "") ){
            this.errorP.innerHTML = "Fügen Sie bitte alle Wörter hin!";
            this.tableADD.appendChild(this.errorP);
            return;
        } else if(newWord && (this.hasTripleLetters(deWord) || this.hasTripleLetters(enWord)) ){
            this.errorP.innerHTML = `Sie haben drei mal eine Buchstabe geschrieben!`;
            this.tableADD.appendChild(this.errorP);
            return;
        } else if(newWord && (this.hasDigits(deWord) || this.hasDigits(enWord)) ){
            this.errorP.innerHTML = `Schreiben Sie bitte keine Zahl!`;
            this.tableADD.appendChild(this.errorP);
            return;
        } else {
            this.errorP.textContent = "";
        }

        this.listNewWords[enWord] = deWord;
        localStorage.setItem("listNewWords", JSON.stringify(this.listNewWords));

        const wordTr = document.createElement("tr");
        const enWordTd = document.createElement("td");
        const deWordTd = document.createElement("td");
        const wordDeleteTd = document.createElement("td");
        const worEditTd = document.createElement("td");

        const btnWordDelete = document.createElement("button");
        const btnWorEdit = document.createElement("button");

        btnWordDelete.id = this.buttonID + "-delete-word";
        btnWorEdit.id = this.buttonID + "-edit-word";
        wordTr.id = this.buttonID + "-tr-word";
        this.buttonID ++;

        enWordTd.textContent = enWord;
        deWordTd.textContent = deWord;
        btnWordDelete.textContent = "X";
        btnWorEdit.textContent = "/";

        btnWordDelete.style.backgroundColor = "red";
        btnWorEdit.style.backgroundColor = "orange";


/*        if ((Object.keys(this.listNewWords).length + 1) % 2)
            wordTr.style.backgroundColor = "#F5FFFA";
        else
            wordTr.style.backgroundColor = "#FFFFE0";*/

        wordDeleteTd.appendChild(btnWordDelete);
        worEditTd.appendChild(btnWorEdit);
        wordTr.append(enWordTd, deWordTd, wordDeleteTd, worEditTd);
        this.tableContainer.append(wordTr);

        btnPlay.textContent = "Start";
        btnPlay.style.display = "block";

        btnWordDelete.addEventListener("click", (event)=>{
            const deleteTr = this.searchTr(event);
            this.deleteNewWord(deleteTr)
        });

        // Button Edit in Tabele "tableContainer"
        worEditTd.addEventListener("click", (event)=>{
            const editTr = this.searchTr(event);
            this.editNewWord(editTr);
        })

    }


    // Delet ein Tr
    deleteNewWord(deleteTr) {

        // Löschen Element in this.listNewWords
        delete this.listNewWords[deleteTr.querySelector("td").textContent];
        localStorage.setItem("listNewWords", JSON.stringify(this.listNewWords));

        // Löschen tr in der Tabele
        document.querySelector("#tableContainer").removeChild(deleteTr);
    }

    editNewWord(editTr) {
        // editTr - TR, die wie ändern werden

        // TEXT von WORDS
        // Wörter, die koregieren werden soll
        const enOldWord = editTr.children[0].textContent;
        const deOldWord = editTr.children[1].textContent;

        // TABELE ADD
        // List inputs von Tabele tableADD
        const listInputs =Array.from(document.querySelectorAll("#tableADD input"));
        listInputs[0].value = enOldWord;
        listInputs[1].value = deOldWord;

        // Array Buttons von tableADD
        const listButtons = Array.from(document.querySelectorAll("#tableADD button"));

        // Variable fuer Buttons deklarieren
        let btnAdd = listButtons[0];
        let btnSave = listButtons[1];
        let btnPlay = listButtons[2];

        // Aus/einschalten die Buttons
        btnSave.style.display = "block";
        btnAdd.style.display = "none";
        btnPlay.style.display = "none"

        // Убираем предыдущие обработчики кнопки Save
        const newBtnSave = btnSave.cloneNode(true);
        //Метод replaceChild у родителя заменяет один дочерний элемент другим:
        //Die Methode replaceChild beim Elternelement ersetzt ein Kind-Element durch ein anderes.
        btnSave.parentNode.replaceChild(newBtnSave, btnSave);

        // Wenn btnEdit gedruekt war
        newBtnSave.addEventListener("click", (event)=>{

            // Aus/einschalten die ButtonbtnSaves
            newBtnSave.style.display = "none";
            btnAdd.style.display = "block";
            btnPlay.style.display = "block"

            const newEn = listInputs[0].value.trim();
            const newDe = listInputs[1].value.trim();

            if(!newEn || !newDe) return;

            // Speichern Aenderungen
            editTr.children[0].textContent = listInputs[0].value;
            editTr.children[1].textContent = listInputs[1].value;

            this.listNewWords[listInputs[0].value] = this.listNewWords[enOldWord];
            delete this.listNewWords[enOldWord];
            this.listNewWords[listInputs[0].value] = listInputs[1].value;

            localStorage.setItem("listNewWords", JSON.stringify(this.listNewWords));
            console.log(this.listNewWords);

            // Inputs reinigen
            listInputs[0].value = "";
            listInputs[1].value = "";
        });

    }

    // Wir suchen TR, um "delete" oder "edit" zu machen.
    searchTr(deWord) {
        let str = deWord.target.id;
        let index = str.indexOf("-");

        const trId = str.substring(0, index) + "-tr-word";

        return document.getElementById(trId);
    }

/*    startGame() {
        if (document.querySelector(".task-content") ){
            document.querySelector(".task-content").remove();
        }

    }*/


}

export {NewWordsList};