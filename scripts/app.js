class GameBoard{
    constructor(){ 
        this.rows = 6
        this.columns = 7
        this.board = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        this.addTiles()
    }
    // test for draw
    // this.board = [
    //     ['Y', 'Y', 'Y', 'R', 'Y', 'Y', 'Y'],
    //     ['R', 'R', 'R', 'Y', 'R', 'R', 'R'],
    //     ['Y', 'Y', 'R', 'R', 'R', 'Y', 'R'],
    //     ['R', 'R', 'Y', 'Y', 'R', 'R', 'Y'],
    //     ['Y', 'Y', 'R', 'R', 'Y', 'Y', 'R'],
    //     ['Y', 'Y', 'R', 'R', 'Y', 'R', 'Y']
    // ]




    addTiles(){
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let tile = document.createElement("div")
                tile.id = r.toString() + "-" + c.toString()
                tile.classList.add("tile")
                document.getElementById("board").append(tile)
            }
        }          
    }
    getRows(){
        return this.rows
    }
    getColumns(){
        return this.columns
    }
    setDisc(r, c, player){
        this.board[r][c] = player
    }
    getValue(r,c){
        if(r>=0 && c>= 0)
            return this.board[r][c]
    }
    
}
class Game{
    constructor(){
        this.gameOver = false
        this.playerRed = "R"
        this.playerYellow = "Y"
        this.currPlayer = this.playerRed
        this.gameBoard = new GameBoard()
        this.currColumns =  [5, 5, 5, 5, 5, 5, 5]
        //this.startGame()
    }
    
    setCurrPlayer(p){
        this.currPlayer = p
    }
    getCurrPlayer(){
        return this.currPlayer
    }
    checkWinner(){
        // horizontal
        for (let r = 0; r < this.gameBoard.getRows(); r++) {
            for (let c = 0; c < this.gameBoard.getColumns() - 3; c++){
            if (this.gameBoard.getValue(r,c) != ' ') {
                if (this.gameBoard.getValue(r,c) == this.gameBoard.getValue(r,c+1) && this.gameBoard.getValue(r,c+1) == this.gameBoard.getValue(r,c+2) && this.gameBoard.getValue(r,c+2) == this.gameBoard.getValue(r,c+3)) {
                    this.setWinner(r, c)
                    return;
                }
            }
            }
        }
        // vertical
        for (let c = 0; c < this.gameBoard.getColumns(); c++) {
            for (let r = 0; r < this.gameBoard.getRows() - 3; r++) {
                if (this.gameBoard.getValue(r,c) != ' ') {
                    if (this.gameBoard.getValue(r,c) == this.gameBoard.getValue(r+1,c) && this.gameBoard.getValue(r+1,c) == this.gameBoard.getValue(r+2,c) && this.gameBoard.getValue(r+2,c) == this.gameBoard.getValue(r+3,c)) {
                        this.setWinner(r, c)
                        return;
                    }
                }
            }
        }
        // anti diagonal
        for (let r = 0; r < this.gameBoard.getRows() - 3; r++) {
            for (let c = 0; c < this.gameBoard.getColumns() - 3; c++) {
                if (this.gameBoard.getValue(r,c) != ' ') {
                    if (this.gameBoard.getValue(r,c) == this.gameBoard.getValue(r+1,c+1) && this.gameBoard.getValue(r+1,c+1) == this.gameBoard.getValue(r+2,c+2) && this.gameBoard.getValue(r+2,c+2) == this.gameBoard.getValue(r+3,c+3)) {
                        this.setWinner(r, c)
                        return;
                    }
                }
            }
        }
        // diagonal
        for (let r = 3; r < this.gameBoard.getRows(); r++) {
            for (let c = 0; c < this.gameBoard.getColumns() - 3; c++) {
                if (this.gameBoard.getValue(r,c) != ' ') {
                    if (this.gameBoard.getValue(r,c) == this.gameBoard.getValue(r-1,c+1) && this.gameBoard.getValue(r-1,c+1) == this.gameBoard.getValue(r-2,c+2) && this.gameBoard.getValue(r-2,c+2) == this.gameBoard.getValue(r-3,c+3)) {
                        this.setWinner(r, c)
                        return;
                    }
                }
            }
        }
        //draw 
        let x = 0
        for(let r = 0; r < this.gameBoard.getRows(); r++){
            for(let c = 0; c< this.gameBoard.getColumns();c++){
                if(this.gameBoard.getValue(r,c) != ' '){
                    x++
                }
            }
        }
        if(x==42){
            this.draw()
        }

    }
    setWinner(r,c){

      // Retrieve the input values from session storage
      let name = sessionStorage.getItem("red");
      let age = sessionStorage.getItem("ylw");


        let winner = document.getElementById("winner");
        let message;
        if (this.gameBoard.getValue(r,c) == this.playerRed) {
            message = name+" Wins!";
            winner.innerHTML = "<span style='font-size: 4rem; color: #d00000;'></span>";
        } else {
            message = age+" Wins!";
            winner.innerHTML = "<span style='font-size: 4rem; color: #ffba08;'></span>";
        }
        winner.style.display = "block";
        winner.style.textAlign = "center";
        winner.style.paddingTop = "2rem";
        winner.style.fontWeight = "bold";
        this.gameOver = true;
        // add the message to the board letter by letter
        let i = 0;
        let interval = setInterval(() => {
            if (i < message.length) {
                winner.children[0].innerHTML += message.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
    draw(){
        let winner = document.getElementById("winner");
        let message = "Game Over!";
        winner.style.display = "block";
        winner.style.textAlign = "center";
        winner.style.paddingTop = "2rem";
        winner.style.fontWeight = "bold";
        winner.style.color = "#274c77";
        this.gameOver = true;
        let i = 0;
        let interval = setInterval(() => {
        if (i < message.length) {
            winner.innerHTML += message.charAt(i)
            i++
        } else {
            clearInterval(interval);
        }
    }, 100);
}
}
const game = new Game()
for (let r = 0; r < game.gameBoard.getRows(); r++) {
    for (let c = 0; c < game.gameBoard.getColumns(); c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString())
        tile.addEventListener("click", setPiece)
        document.getElementById("board").append(tile)                
    }
}    
function setPiece(){
    if (game.gameOver) {
        return;
    }
    let coords = this.id.split("-")
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])
    r = game.currColumns[c]
    if (r < 0) { 
        return;
    }
    game.gameBoard.setDisc(r, c, game.currPlayer)
    let tile = document.getElementById(r.toString() + "-" + c.toString())
    if (game.currPlayer == game.playerRed) {
        document.getElementById("trn").innerHTML ="<span style='color: ##274c77;'>"+age+" Turn"+"</span>" 
        tile.classList.add("red-piece")
        game.setCurrPlayer(game.playerYellow)
    }
    else {
        document.getElementById("trn").innerHTML = "<span style='color: ##274c77;'>"+name+" Turn"+"</span>"
        tile.classList.add("yellow-piece")
        game.setCurrPlayer(game.playerRed)
    }
    r -= 1
    game.currColumns[c] = r
    game.checkWinner()
}
function showConfirmation() {
    if (confirm("Are you sure you want to restart the game?")) {
      window.location.href = '2players.html';
    }
  }
  
  document.getElementById("connect4Btn").addEventListener("click", function() {
  window.location.href = "index.html";
});
