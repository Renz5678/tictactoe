const buttons = document.getElementById("buttons");
const startWrapper = document.getElementById("start-wrapper");
const smoke = document.getElementById("smoke");
const turn = document.getElementById("turn");
const pvc = document.getElementById("pvc");
const endPrompt = document.getElementById("end");
const result = document.getElementById("result");
const playAgain = document.getElementById("play-again");
let winner = "";
let isVsComputer = false;

pvc.addEventListener("click", () => {
    isVsComputer = true;
    turn.innerHTML = "Player's turn";
});

const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const column3 = document.getElementById("column3");

let numberOfMoves = 0;

buttons.addEventListener("click", (e) => {
    startWrapper.classList.add("hide");
    smoke.classList.add("show");
});

const boxes = document.querySelectorAll(".box")

boxes.forEach(box => {
  box.addEventListener("click", (e) => {
    if (e.target.innerHTML === "") {
        let currentPlayer = checkWhoseTurn();
        numberOfMoves++;

        e.target.innerHTML = currentPlayer;

        if (isVsComputer) {
            turn.innerHTML = "Computer's turn...";
            setTimeout(() => {
                computerTurn();
                turn.innerHTML = `Player's turn`;
            }, 1500); // 0.5s delay
        }

        if (checkWinningCondition() !== null) {
            winner = checkWinningCondition();
            showEndScreen();
            return;
        }

        if (numberOfMoves >= 9 && checkWinningCondition() === null) {
            winner = "draw";
            showEndScreen();
            return;
        }

        if (!isVsComputer) turn.innerHTML = `Player ${checkWhoseTurn()}'s turn...`;
    } else {
        alert("Box already filled!");
    }
  });
});

function computerTurn() {
    const columns = [column1, column2, column3];

    const board = [
    [columns[0].children[0], columns[1].children[0], columns[2].children[0]],
    [columns[0].children[1], columns[1].children[1], columns[2].children[1]],
    [columns[0].children[2], columns[1].children[2], columns[2].children[2]],
    ];

    let x = Math.floor(Math.random() * 3);
    let y = Math.floor(Math.random() * 3);

    if (board[x][y].textContent.trim() === "") {
        board[x][y].innerHTML = 'o';
        numberOfMoves++

        if (checkWinningCondition() !== null) {
            winner = checkWinningCondition();
            showEndScreen();
            return;
        }

        if (numberOfMoves >= 9 && checkWinningCondition() === null) {
            winner = "draw";
            showEndScreen();
            return;
        }
        return;
    } else {
        computerTurn();
    }
}

function showEndScreen() {
    endPrompt.classList.add("visible");
    smoke.classList.remove("show");
    if (isVsComputer) {
        if (winner === "o") {
            result.innerHTML = "Computer Wins!";
            return;
        }
    }

    if (winner === "draw") {
        result.innerHTML = "It's a Draw!";
    } else {
        result.innerHTML = `${winner} wins!`;
    }

}
function checkWhoseTurn() {
    if (numberOfMoves % 2 == 0) {
        return 'x';
    }
    return 'o';
}

function checkWinningCondition() {
    const columns = [column1, column2, column3];

    const board = [
        [columns[0].children[0].textContent.trim(), columns[1].children[0].textContent.trim(), columns[2].children[0].textContent.trim()],
        [columns[0].children[1].textContent.trim(), columns[1].children[1].textContent.trim(), columns[2].children[1].textContent.trim()],
        [columns[0].children[2].textContent.trim(), columns[1].children[2].textContent.trim(), columns[2].children[2].textContent.trim()],
    ];

    function allEqual(a, b, c) {
        return a !== "" && a === b && a === c;
    }

    for (let row = 0; row < 3; row++) {
        if (allEqual(board[row][0], board[row][1], board[row][2])) {
            return board[row][0];
        }
    }

    for (let col = 0; col < 3; col++) {
        if (allEqual(board[0][col], board[1][col], board[2][col])) {
            return board[0][col];
        }
    }

    if (allEqual(board[0][0], board[1][1], board[2][2])) {
        return board[0][0];
    }

    if (allEqual(board[0][2], board[1][1], board[2][0])) {
        return board[0][2];
    }

    return null;
}

playAgain.addEventListener("click", () => {
    alert("Restarting page😁👌");
    setTimeout(location.reload(), 1500);
});