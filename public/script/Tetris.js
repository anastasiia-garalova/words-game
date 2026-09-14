import {Cards} from './Cards.js';

class Tetris {

    constructor(cols, rows, showMenu) {

        const modalContainer = document.getElementsByClassName("modal")[0];
        const menuButton = document.getElementById("menu-button");
        menuButton.style.display = "block"; 

        menuButton.addEventListener("click", () => {
            this.stopGame();

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
        this._cloneCardsArray = this.createCloneCardArray();

        this._columns = cols;
        this._rows = rows;
        this._tetrisTable = this.createTetrisPanel();
        this.modalContainer.append(this._tetrisTable);

        // Blocks Array mit Flag "null" oder "block"
        this._grid = this.createGrid();

        this._timeout = 500;
        this._counter = 0;

        this._isStopped = false;
        this._currentStop = null;
    }

    // Jeder Block wird vor einander setzen
    async startTetris(onEnd) {

        this._isStopped = false;

        let blocksTotalCount = this._rows * this._columns;
        let bgColorId = Math.floor(Math.random() * this._bgColorArray.length);
        let oldBgColorId = undefined;
        let wordID = 0;

        for (let i = 0; i < blocksTotalCount; i++) {
            
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
            } else if ( !this._cloneCardsArray[color][wordID] ) {
                wordID = wordID ? 0 : 1;
            }

            block.textContent = this._newCardsArray[color][wordID];
            this._cloneCardsArray[color][wordID] = null;

            this._tetrisTable.appendChild(block);

            const continueGame = await this.moveBlock(block, "down", color, wordID);

            if (this._isStopped) {
                return;
            }

            if (!continueGame) {
                onEnd("lose");
                return;
            }
        }

        if (!this.isGridEmpty()) {
            onEnd("lose");
            return;
        }
    }

    stopGame() {

    this._isStopped = true;

    if (this._currentStop) {
        this._currentStop();
        this._currentStop = null;
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

        const tetrisTable = document.createElement("div");
        tetrisTable.id = "tetris-table";

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

    moveBlock(block, direction = "down", color, wordID) {
        return new Promise(resolve => {

            let rowStart = parseInt(block.style.gridRow.split("/")[0]);
            let height = 1;
            let col = parseInt(block.style.gridColumn);

            let interval;
            let finished = false;

            const finish = async (continueGame) => {
                if (finished) return;

                finished = true;

                clearInterval(interval);
                document.removeEventListener("keydown", keyHandler);

                if (this._currentStop === stopFromOutside) {
                    this._currentStop = null;
                }

                resolve(continueGame);
            };

            const stopFromOutside = () => {

                clearInterval(interval);
                document.removeEventListener("keydown", keyHandler);

                if (!finished) {
                    finished = true;
                    resolve(false);
                }

                this._currentStop = null;
            };

            this._currentStop = stopFromOutside;

            const keyHandler = (event) => {

                if (this._isStopped) return;

                if (event.key === "ArrowLeft" && col > 1) {
                    col--;
                } 
                else if (event.key === "ArrowRight" && col < this._columns) {
                    col++;
                } 
                else if (event.key === "ArrowDown" && rowStart > 2) {
                    startInterval(this._timeout / 2);
                }
            };

            document.addEventListener("keydown", keyHandler);

            const stop = async () => {
                if (finished) return;

                clearInterval(interval);
                document.removeEventListener("keydown", keyHandler);

                this._currentStop = null;

                const continueGame = await this.checkup(
                    color,
                    wordID,
                    rowStart,
                    col
                );

                if (!finished) {
                    finished = true;
                    resolve(continueGame);
                }
            };

            const startInterval = (speed) => {

                clearInterval(interval);

                interval = setInterval(() => {

                    if (this._isStopped) {
                        stopFromOutside();
                        return;
                    }

                    if (
                        rowStart > this._rows ||
                        (rowStart > 2 &&
                        this._grid[rowStart - 1][col - 1])
                    ) {
                        stop();
                        return;
                    }

                    block.style.gridColumn = `${col}`;
                    block.style.gridRow =
                        `${rowStart}/${rowStart + height}`;

                    rowStart++;

                }, speed);
            };

            startInterval(this._timeout);
        });
    }


    dropColumn(colIndex) {

        const height = this._grid.length;

        const values = [];

        for (let row = height - 1; row >= 0; row--) {
            const cell = this._grid[row][colIndex];
            if (cell !== null) {
                values.push(cell);
            }
        }

        for (let row = height - 1; row >= 0; row--) {
            this._grid[row][colIndex] = values.shift() ?? null;
        }
    }


    renderColumn(colIndex) {
        
        const table = this._tetrisTable;

        table.querySelectorAll('.block').forEach(block => {
            const col = parseInt(block.style.gridColumn);
            if (col === colIndex + 1) block.remove();
        });

        // Zeichne die Spalte gemäß _grid neu
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
            return true; 
        }
    }


    async checkMatches(row, col) {
        const cell = this._grid[row][col];
        if (!cell) return;

        const color = Object.keys(cell)[0];
        const connected = this.findConnected(row, col, color);

        if (connected.length < 2) return;

        connected.forEach(({ row, col }) => {
            this._grid[row][col] = null;

            const el = document.querySelector(
                `.block[style*="grid-column: ${col + 1}"]` +
                `[style*="grid-row: ${row + 1} /"]`
            );
            if (el) el.remove();
        });

        const affectedCols = [...new Set(connected.map(c => c.col))];
        affectedCols.forEach(col => {
            this.dropColumn(col);
            this.renderColumn(col); 
        });

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