//TIC TAC TOE

//* Constants *//
let colors = {
    "": "black",
    "-1": "lightblue",
    "1": "lightgreen",
};
const winningCombo = [
    [0,1,2], [3,4,5],[6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

//* State Variables *//
let board = ["","","","","","","","",""];
let tieSum = 0; 
let playerTurn = 1; //Player 1 - 1, Player 2 - -1
let gameStatus = ""; //Player 1 Win - 1, Player 2 Win - -1 Tie - T

//* Cached Variables *//
let colorTurn = document.querySelector(".turn");
let squares = document.querySelectorAll(".square");
let resetBtn = document.querySelector(".reset");

init();


//* Event Listeners *//
function init() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", handleSqClick);
    };
    resetBtn.addEventListener("click", handleResetClick);
    prepareForGame(); 
};


//* Functions *//
function handleSqClick(e) {
    e.preventDefault();
    let clicked = e.currentTarget;
    if (board[clicked.id] !== "" || gameStatus !== "") {
        return;
    };

    if (playerTurn === 1) {
        clicked.style.backgroundColor = colors[playerTurn];
        clicked.innerText = "✖";
    } else if (playerTurn === -1) {
        clicked.style.backgroundColor = colors[playerTurn]; 
        clicked.innerText = "O";
    };
    board[parseInt(clicked.id)] = playerTurn;
    tieSum += 1; //Positioned before checkWinner to ensure that tieSum=9 is fed into checkWinner.
    checkWinner();
    playerTurn *= -1; //Positioned after checkWinner to ensure that the player's turn is not changed away from the winner's turn.
    renderMessage();
};

function handleResetClick(e) {
    e.preventDefault();
    reset();
    prepareForGame();
}

function checkWinner() {
    //Winning Condition
    for (let i=0;i<winningCombo.length;i++) {
        const combo = winningCombo[i]; //Utilizing indices of winning combinations to find total score for those indices
        const sq1 = board[combo[0]]; 
        const sq2 = board[combo[1]];
        const sq3 = board[combo[2]];
        const sumSquare = Math.abs(sq1 + sq2 + sq3);

        if (sq1 === "" || sq2 === "" || sq3 === "") {
            continue; //game continues as empty boxes still exist
        };

        //Win!
        if (sumSquare === 3) {
            gameStatus = playerTurn;
            break;
        };
    }

    //Tie condition
    if (tieSum === 9) {
        gameStatus = "T";
    };
};

function reset() {
    board = ["","","","","","","","",""];
    tieSum = 0; 
    playerTurn = 1; //Player 1 - 1, Player 2 - -1
    gameStatus = ""; //Player 1 Win - 1, Player 2 Win - -1 Tie - T
};

function renderBoard() {
    for (let i=0;i<squares.length;i++) {
        let colorIndex = board[i];
        squares[i].style.backgroundColor = colors[colorIndex];
        squares[i].innerText = "";
        //console.log(colors["-1"], squares[i].style.backgroundColor);
    };
};

function renderMessage() {
    if (gameStatus === "") {
        if (playerTurn === -1) {
            colorTurn.innerText = `Player 2's Turn (O)`;
            colorTurn.style.color = colors[playerTurn];
        } else {
        colorTurn.innerText = `Player ${playerTurn}'s Turn (✖)`;
        colorTurn.style.color = colors[playerTurn];
        };
    } else if (gameStatus === "T") {
        colorTurn.innerText = "It is a tie."
    } else {
        if (playerTurn === 1) { //opposite playerTurn to determine winner due to sequencing in handleSqClick
            colorTurn.innerText = `Congratulations Player 2!`;
            colorTurn.style.color = colors[gameStatus];
        }
        colorTurn.innerText = `Congratulations Player 1!`;
        colorTurn.style.color = colors[gameStatus];
    }
};

function prepareForGame() {
    renderBoard();
    renderMessage();
};


