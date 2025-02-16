const gameBoard = (function() {
    let board = [["X", "o", "x"],
                 ["o", "o", "x"],
                 ["x", "x", ""]]
    
    function getValue(row, col) {
        console.log(board[row][col]);
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
        isBoardFull
    }
})();

function Player(name, sign) {
    this.name = name;
    this.sign = sign;
}

Player.prototype.setValue = function(row, col){
    gameBoard.setValue(row, col, this.sign);
};

const gameController = (function() {
    const player1 = new Player("aa", "X");
    const player2 = new Player("bb", "O");
    let turn = 1;
    let gameOver = false;

    function switchTurn(){
        turn = turn === 1 ? 2 : 1;
    }

    function playTurn(row, col) {
        if(gameOver === false) {
            turn === 1 ? player1.setValue(row,col) : player2.setValue(row,col);
            switchTurn();
            console.log(gameBoard.getBoard());
            if (gameBoard.checkWin() === "X") {
                console.log("player1 wins");
            } else if(gameBoard.checkWin() === "O"){
                console.log("player2 wins");
            } else if(gameBoard.checkWin() === "Draw") {
                console.log("Draw")
            } else {
                console.log(`This is player${turn} turn`)
            }
        }
        
    }

    function getTurn() {
        return turn;
    }

    function startGame() {
        console.log(`This is player${turn} turn`)
    }

    return {
        startGame,
        playTurn,
        switchTurn,
        getTurn
    }


})();
