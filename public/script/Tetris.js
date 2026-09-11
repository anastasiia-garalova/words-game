import {Cards} from './Cards.js';
//import * as console from "node:console";

class Tetris {

    constructor(cols, rows, showMenu) {

        const modalContainer = document.getElementsByClassName("modal")[0];
        const menuButton = document.getElementById("menu-button");
        menuButton.style.display = "block"; 
        //console.log("Менеджер карточек запущен / Karten-Manager gestartet");

        menuButton.addEventListener("click", () => {
            modalContainer.innerHTML = "";
            showMenu(); // Вызываем функцию showMenu / Rufen Sie die Funktion showMenu auf
        });

        this.modalContainer = document.getElementsByClassName("modal")[0];
        const table = document.getElementById("tetris-table");
        if (table) {
            table.remove();
        }

        this._cards = new Cards().cards;

        this._bgColorArray = ["yellow", "orange", "green", "pink", "aqua"];
        // Cards Array mit Farben (Colors)
        this._newCardsArray = this.createNewCardsArray();
        console.log("this._newCardsArray: ",this._newCardsArray);
        this._cloneCardsArray = this.createCloneCardArray();
        console.log("this._cloneCardsArray: ", this._cloneCardsArray);

        this._columns = cols;
        this._rows = rows;
        this._tetrisTable = this.createTetrisPanel();
        this.modalContainer.append(this._tetrisTable);

        // Blocks Array mit Flag "null" oder "block"
        this._grid = this.createGrid();
        console.log("this._grid: ", this._grid);

        this._timeout = 500;
        this._counter = 0;


    }

    // Jeder Block wird vor einander setzen
    // Каждый блок появляется один за другим
    async startTetris(onEnd) {

        let blocksTotalCount = this._rows * this._columns;
        let bgColorId = Math.floor(Math.random() * this._bgColorArray.length);
        let oldBgColorId = undefined;
        let wordID = 0;

        for (let i = 0; i < blocksTotalCount; i++) {
            // 🎉 ПОБЕДА
            if (i > 0 && this.isGridEmpty()) {
                onEnd("win");
                return;
            }

            // Erstellen verschiedene bgColor von Block
            while (oldBgColorId === bgColorId) {
                bgColorId = Math.floor(Math.random() * this._bgColorArray.length);
            }
            oldBgColorId = bgColorId;

            const block = this.createBlock(bgColorId);
            const color = this._bgColorArray[bgColorId];

            // Um gleiche color mit verschiedene Woerter war, wordID aendern
            if ( !this._cloneCardsArray[color][0] && !this._cloneCardsArray[color][1] ) {
                this._cloneCardsArray[color] = {...this._newCardsArray[color]};
                //console.log(this._cloneCardsArray)
            } else if ( !this._cloneCardsArray[color][wordID] ) { // wenn id = 0 schon war, dann aendern auf 1
                wordID = wordID ? 0 : 1;
            }
            block.textContent = this._newCardsArray[color][wordID];
            console.log("color:", color, "wordID: ", wordID, "this._cloneCardsArray: ", this._cloneCardsArray[color][wordID])
            this._cloneCardsArray[color][wordID] = null;

            this._tetrisTable.appendChild(block);

            // ждём пока блок упадёт
            const continueGame = await this.moveBlock(block, "down", color, wordID);
            if (!continueGame) {
                onEnd("lose");
                return;
            }
        }
        setInterval(()=>{},1000);
        if (!this.isGridEmpty()) {
            onEnd("lose");
        }
    }

    createNewCardsArray() {
        let newCardsArray = [];

        // New Cards Array
        let index = 0;
        this._cards.forEach((oneWord, twoWrd) => {

            if ( !(index % this._bgColorArray.length) ) index = 0;

            let color = this._bgColorArray[index];
            newCardsArray[color] = [oneWord, twoWrd];
            index++;
        });

        return newCardsArray;
    }

    createCloneCardArray() {
        const cloneCardsArray = {};
        for (let color in this._newCardsArray) {
            cloneCardsArray[color] = [...this._newCardsArray[color]]; // клонируем массив
        }

        return cloneCardsArray;
    }

    createTetrisPanel() {

        // tetris Container
        const tetrisTable = document.createElement("div");
        tetrisTable.id = "tetris-table";

        // заполняем снизу вверх
        /*        for (let row = 0; row >= 0; row--) {
                    for (let col = 0; col < this._columns; col++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        cell.textContent = "row: " + row + "-" + "col: " + col;
                        tetrisTable.appendChild(cell);
                    }
                }*/

        return tetrisTable;
    }

    createBlock(bgColorId) {
        const block = document.createElement('div');
        block.className = 'block ' + this._bgColorArray[bgColorId];

        // Erste Position von Block
        block.style.gridColumn = "2";
        block.style.gridRow = "1/2";

        return block;
    }

    // Blocks Array mit Flag "null" oder "block"
    createGrid() {
        let grid = [];

        for (let row = 0; row < this._rows; row++) {
            grid[row] = new Array(this._columns).fill(null);
        }

        return grid;
    }
/*
    moveBlock(block, direction = "down", color, wordID) {
        return new Promise(resolve => {
            const blockHeight = 40; // высота блока в пикселях (нужно под твой CSS)
            let rowStart = parseInt(block.style.gridRow.split("/")[0]);
            let col = parseInt(block.style.gridColumn);
            let offset = 0; // смещение в пикселях внутри строки
            let lastTime = performance.now();

            const keyHandler = (event) => {
                if (event.key === "ArrowLeft" && col > 1) col--;
                if (event.key === "ArrowRight" && col < this._columns) col++;
                if (event.key === "ArrowDown") offset += 5; // ускорение падения
            };

            document.addEventListener("keydown", keyHandler);

            const animate = (time) => {
                const delta = time - lastTime;
                lastTime = time;

                // вычисляем, сколько пикселей пройти за этот кадр
                offset += (blockHeight / this._timeout) * delta;

                // проверка перехода на следующую строку
                let newRow = rowStart + Math.floor(offset / blockHeight);

                // проверка столкновения с низом или другим блоком
                if (newRow > this._rows || (newRow > 2 && this._grid[newRow - 1][col - 1])) {
                    document.removeEventListener("keydown", keyHandler);
                    offset = (newRow - rowStart) * blockHeight; // корректируем смещение для визуального отображения
                    block.style.transform = `translateY(${offset}px)`;
                    // фиксируем блок в сетке
                    this.checkup(color, wordID, newRow, col)
                        .then((continueGame) => {
                            resolve(continueGame);
                        });
                    return;
                }

                // обновляем позицию блока визуально
                console.log("offset: ", offset);
                block.style.transform = `translateY(${offset}px)`;
                block.style.gridColumn = `${col}`;

                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        });
    }

*/


    moveBlock(block, direction = "down", color, wordID) {
        return new Promise(resolve => {

            // if (direction === "down") {

            // Nahmen Positions Daten von Block Element: rowStart, col
            let rowStart = parseInt(block.style.gridRow.split("/")[0]);
            //let rowEnd = parseInt(block.style.gridRow.split("/")[1]);
            let height = 1
            let col = parseInt(block.style.gridColumn);

            // Move <- or ->
            const keyHandler = (event) => {
                if (event.key === "ArrowLeft" && col > 1) {
                    col--;
                } else if (event.key === "ArrowRight" && col < this._columns) {
                    col++;
                } else if (event.key === "ArrowDown" && rowStart > 2) {
                    startInterval(this._timeout / 2);
                }
            };

            document.addEventListener("keydown", keyHandler);

            let interval;

            const stop = async () => {
                clearInterval(interval);
                document.removeEventListener("keydown", keyHandler);

                const continueGame = await this.checkup(color, wordID, rowStart, col);
                resolve(continueGame);

                if (!continueGame) {
                    this._counter ++;
                    if ( this._counter % 5 === 0 ) {
                        this._timeout = Math.max(200, this._timeout - 100);
                        console.log("this._timeout:" + this._timeout);
                        startInterval(this._timeout);
                    }
                }
            };

            const startInterval = (speed) => {

                clearInterval(interval);
                // Стрелочная функция не теряет this
                interval = setInterval( ()=> {

                    // Wenn Block bis ende Tabele oder ander Block gegangen ist, loeschen wir unser Interval und  EventListener
                    if (rowStart > this._rows ||
                        (rowStart > 2 && this._grid[rowStart - 1][col - 1])
                    ) {    // End Blocks Position
                        stop();
                        return;
                    }

                    block.style.gridColumn = `${col}`;
                    block.style.gridRow = `${rowStart}/${rowStart + height}`;
                    console.log("-------------------------")

                    rowStart++;

                }, speed);
            }

            startInterval(this._timeout);
            // }
        })

    }


    dropColumn(colIndex) {

        const height = this._grid.length;

        // 1. Забираем все НЕ null элементы снизу вверх
        const values = [];

        for (let row = height - 1; row >= 0; row--) {
            const cell = this._grid[row][colIndex];
            if (cell !== null) {
                values.push(cell);
            }
        }

        // 2. Заполняем колонку снизу вверх
        for (let row = height - 1; row >= 0; row--) {
            this._grid[row][colIndex] = values.shift() ?? null;
        }
    }

    renderColumn(colIndex) {
        const table = this._tetrisTable;

        // Удаляем все блоки в колонке
        table.querySelectorAll('.block').forEach(block => {
            const col = parseInt(block.style.gridColumn);
            if (col === colIndex + 1) block.remove();
        });

        // Перерисовываем колонку по _grid
        for (let row = 0; row < this._rows; row++) {
            const cell = this._grid[row][colIndex];
            if (!cell) continue;

            const color = Object.keys(cell)[0];
            const word = cell[color].find(Boolean);

            const block = document.createElement('div');
            block.className = `block ${color}`;
            block.textContent = word;
            block.style.gridColumn = colIndex + 1;
            block.style.gridRow = `${row + 1} / ${row + 2}`;

            table.appendChild(block);
        }
    }


    async checkup(color, wordID, rowStart, col) {
        const row = rowStart - 2;
        const colIndex = col - 1;

        console.log("row: ", row)
        if (row === 1) {
            return false;
        } else {
            if (row < 0 || row >= this._rows) return;
            if (colIndex < 0 || colIndex >= this._columns) return;

            let cell = {};
            cell[color] = [];
            cell[color][wordID] = this._newCardsArray[color][wordID];
            this._grid[row][colIndex] = cell;

            await this.checkMatches(row, colIndex);
            return true; // игра продолжается
        }
    }


    /*   checkup(color, wordID, rowStart, col) {

           const rowIndex = rowStart - 2;
           const colIndex = col - 1;

           let arr = [];
           let word = this._newCardsArray[color][wordID];

           arr[color] = new Array(2);
           arr[color][wordID] = word;
           this._grid[rowIndex][colIndex] = arr;

           let key;
           let keyLinks;
           let keyRights;
           let keyBottom;

           let cell  = this._grid[rowIndex][colIndex];
           if (cell) {
               key = Object.keys(cell)[0];  // безопасно
               //console.log("key: ",key);
           }

           if (colIndex > 0) {
               let cellLinks = this._grid[rowIndex][colIndex -1];
               if (cellLinks) {
                   [keyLinks] = Object.keys(cellLinks);
                   //console.log("keyLinks: ",keyLinks);
               }
           }

           if (colIndex < 2) {
               let cellRights = this._grid[rowIndex][colIndex +1];
               if (cellRights) {
                   [keyRights] = Object.keys(cellRights);
                   //console.log("keyRehts: ",keyRehts);
               }
           }

           if (rowIndex < this._rows - 1) {
               let cellBottom = this._grid[rowIndex + 1][colIndex];
               if (cellBottom) {
                   [keyBottom] = Object.keys(cellBottom);
                   //console.log("keyBottom: ",keyBottom);
               }
           }

           this.deleteBlock(key, keyBottom, keyLinks, keyRights, rowStart, col);
       }*/

    /*    deleteBlock(key, keyBottom, keyLinks, keyRights, rowStart, col) {
            const rowIndex = rowStart - 2;
            const colIndex = col - 1;

            if(key === keyBottom || key === keyLinks || key === keyRights) {
                if (key === keyBottom) {
                    console.log("key === keyBottom: ",key)

                    const el1 = document.querySelector(`.block.${key}[style*="grid-area: ${rowStart - 1} / ${col} / ${rowStart}"]`);
                    const el2 = document.querySelector(`.block.${key}[style*="grid-area: ${rowStart} / ${col} / ${rowStart + 1}"]`);
                    // console.log(`.block.${key}[style*="grid-area: 15 / 3 / 16`)
                    if (el1 && el2) {
                        el1.remove();
                        el2.remove();
                        console.log(this._grid)

                        this._grid[rowIndex][colIndex] = null;
                        this._grid[rowIndex + 1][colIndex] = null;
                    }
                } else if (key === keyRights) {
                    console.log("keyRehts: ",keyRights);
                    const el1 = document.querySelector(`.block.${key}[style*="grid-area: ${rowStart - 1} / ${col} / ${rowStart}"]`);
                    const el2 = document.querySelector(`.block.${key}[style*="grid-area: ${rowStart - 1} / ${col + 1} / ${rowStart}"]`);

                    if (el1 && el2) {
                        el1.remove();
                        el2.remove();
                        console.log(this._grid)

                        this._grid[rowIndex][colIndex] = null;
                        this._grid[rowIndex][colIndex + 1] = null;

                        console.log("rowIndex -1: ",rowIndex - 1, "colIndex: ", colIndex + 1);
                        if (this._grid[rowIndex - 1][colIndex + 1]) {
                            this.dropColumn(colIndex + 1)
                            this.renderColumn(colIndex + 1);
                        }
                    }
                }else if (key === keyLinks) {
                    console.log("keyLinks: ",keyLinks);
                    const el1 = document.querySelector(`.block.${key}[style*="grid-area: ${rowStart - 1} / ${col} / ${rowStart}"]`);
                    const el2 = document.querySelector(`.block.${key}[style*="grid-area: ${rowStart - 1} / ${col - 1} / ${rowStart}"]`);

                    if (el1 && el2) {
                        el1.remove();
                        el2.remove();
                        console.log(this._grid)

                        this._grid[rowIndex][colIndex] = null;
                        this._grid[rowIndex][colIndex - 1] = null;

                        if (this._grid[rowIndex - 1][colIndex - 1]) {
                            this.dropColumn(colIndex - 1)
                            this.renderColumn(colIndex - 1);
                        }
                    }
                }
            }
        }*/

    async checkMatches(row, col) {
        const cell = this._grid[row][col];
        if (!cell) return;

        const color = Object.keys(cell)[0];
        const connected = this.findConnected(row, col, color);

        // Условие совпадения (2+ или 3+)
        if (connected.length < 2) return;

        // 1. Удаляем из grid и DOM сразу
        connected.forEach(({ row, col }) => {
            this._grid[row][col] = null;

            const el = document.querySelector(
                `.block[style*="grid-column: ${col + 1}"]` +
                `[style*="grid-row: ${row + 1} /"]`
            );
            if (el) el.remove();
        });

        // 2. Роняем колонки
        const affectedCols = [...new Set(connected.map(c => c.col))];
        affectedCols.forEach(col => {
            this.dropColumn(col);
            this.renderColumn(col); // синхронно
        });

        // 3. Повторная проверка (цепочки)
        affectedCols.forEach(col => {
            for (let r = 0; r < this._rows; r++) {
                if (this._grid[r][col]) {
                    this.checkMatches(r, col); // синхронно
                }
            }
        });


    }



    findConnected(row, col, color, visited = new Set()) {
        const key = `${row},${col}`;
        if (visited.has(key)) return [];
        visited.add(key);

        if (
            row < 0 || row >= this._rows ||
            col < 0 || col >= this._columns
        ) return [];

        const cell = this._grid[row][col];
        if (!cell || !cell[color]) return [];

        let result = [{ row, col }];

        const dirs = [
            [0, 1],  // right
            [0, -1], // left
            [1, 0],  // down
            [-1, 0]  // up
        ];

        for (const [dr, dc] of dirs) {
            result = result.concat(
                this.findConnected(row + dr, col + dc, color, visited)
            );
        }

        return result;
    }


    isGridEmpty() {
        return this._grid.every(row =>
            row.every(cell => cell === null)
        );
    }

}

export {Tetris};