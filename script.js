const gameBoard = (function() {
    let board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]]
    
    function getValue(row, col) {
        return board[row][col];
    }

    function setValue(row, col, value) {
        if(board[row][col] === ""){
            board[row][col] = value;
        } else {
            return false
        }
        
    }

    function getBoard(){
        return board;
    }

    function resetBoard() {
        board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]]
    }

    function isBoardFull() {
        for(let row of board){
            for (let col of row) {
                if(col === "") {
                    return false;
                }
            }
        }
        return true
    }

    function checkWin() {
        // Check Rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0]; // Return winning player ('X' or 'O')
            }
        }

        // Check Columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }
        }

        // Check Diagonal (Top-left to Bottom-right)
        if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }

        // Check Diagonal (Top-right to Bottom-left)
        if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        if(isBoardFull()){
            return "Draw";
        }

        

        return null; // No winner yet
    }

    return {
        getValue,
        setValue,
        getBoard,
        checkWin,
        isBoardFull,
        resetBoard
    }
})();

function Player(name, sign) {
    this.name = name;
    this.sign = sign;
}

Player.prototype.setValue = function(row, col){
    if(gameBoard.setValue(row, col, this.sign) === false){
        return false
    };
};

const gameController = (function() {
    const player1 = new Player("aa", "X");
    const player2 = new Player("bb", "O");
    let turn = 1;
    let gameOver = false;
    let turnText = document.querySelector(".turn-text")

    function switchTurn(){
        turn = turn === 1 ? 2 : 1;
    }

    function playTurn(row, col) {
        
        if(gameOver === false) {
            if(turn === 1) {
                if(player1.setValue(row,col) === false){
                    console.log("false move");
                } else {
                    switchTurn();
                    console.log(gameBoard.getBoard());
                    if (gameBoard.checkWin() === "X") {
                        displayController.showP1Dialog();
                        gameOver = true;
                    } else if(gameBoard.checkWin() === "O"){
                        displayController.showP2Dialog();
                        gameOver = true;
                    } else if(gameBoard.checkWin() === "Draw") {
                        displayController.DrawDialog();
                        gameOver = true;
                    } else {
                        turnText.textContent = `This is player2's turn (O)`;
                    }
                }

            } else if(turn === 2) {
                if(player2.setValue(row,col) === false){
                    console.log("false move");
                } else {
                    switchTurn();
                    console.log(gameBoard.getBoard());
                    if (gameBoard.checkWin() === "X") {
                        displayController.showP1Dialog();
                    } else if(gameBoard.checkWin() === "O"){
                        displayController.showP2Dialog();
                    } else if(gameBoard.checkWin() === "Draw") {
                        displayController.DrawDialog();
                    } else {
                        turnText.textContent = `This is player1's turn (X)`;
                    }
                }
            }
            
        } else {
            console.log("game over!, restart game")
        }
        
    }


    function restartGame() {
        gameOver = false;
        turn = 1;
        gameBoard.resetBoard();
        turnText.textContent = `This is player1's turn (X)`;
        displayController.renderBoard();
    }

    return {
        restartGame,
        playTurn,
        switchTurn
    }


})();

const displayController = (function() {
    const cells = document.querySelectorAll(".cell");
    const p1dialog = document.querySelector(".player1Dialog");
    const p2dialog = document.querySelector(".player2Dialog");
    const drawDialog = document.querySelector(".drawDialog")

    function addButtonEvent() {
        cells.forEach((cell, index) => {
            let row = Math.floor(index / 3);
            let col = index % 3;

            cell.addEventListener("click", () => {
                gameController.playTurn(row,col);
                renderBoard();
            })
            
        });

        let restartBtn = document.querySelectorAll(".restart-btn");
        restartBtn.addEventListener("click", () => gameController.restartGame())
    }

    function renderBoard() {
        cells.forEach((cell, index) => {
            let row = Math.floor(index / 3);
            let col = index % 3;
    
            const value = gameBoard.getValue(row, col);
            
            if (value === "X" || value === "O") {
                cell.textContent = value;
            } else {
                cell.textContent = ""; 
            }
        });
    }

    function showP1Dialog() {
        p1dialog.showModal();
    }
    function showP2Dialog() {
        p2dialog.showModal();
    }

    function DrawDialog() {
        drawDialog.showModal();
    }

    return {
        addButtonEvent,
        renderBoard,
        showP1Dialog,
        showP2Dialog,
        DrawDialog
    }
})();

displayController.addButtonEvent();

