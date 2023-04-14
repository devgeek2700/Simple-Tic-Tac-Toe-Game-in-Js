let boxes = Array.from(document.getElementsByClassName('box'));
let Result = document.getElementById('result');
let restartbtn = document.getElementById('btn');
let win_line = getComputedStyle(document.body).getPropertyValue('--winning_blocks');

// indexes of array:-
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8]


const O_TEXT = '0';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;
// fill the spaces with null until noone has clicked it
let spaces = Array(9).fill(null);

const startgame = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked));

}

// when we click any boxes we get the index of that box in box clicked function
function boxclicked(e) {
    const id = e.target.id;

    if (spaces[id] === null) {
        // if that space is null which is clicked by user then fill it with the player's turn value in it
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerhaswon() !== false) {
            Result.innerText = `${currentPlayer} has Won!`;
            let winning_blocks = playerhaswon();
// map a line on win combination to show user winning
            winning_blocks.map(box => boxes[box].style.backgroundColor = win_line);
            return;

        }
        // if currentplayer has clicked x/0 then next should be 0/x
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

// winning conditions for game
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function playerhaswon() {
    for (const Condition of winConditions) {
        // a,b,c are index if any one possible codnition is true from winconditions the player has won
        let [a, b, c] = Condition;

        // a,b,c matches any win_blocks return true or return false
        if (spaces[a] && (spaces[a] == spaces[b] && (spaces[a] == spaces[c]))) {
            return [a, b, c];
        }
    }
    return false;
}

restartbtn.addEventListener('click', restartgame);


// restartbtn will fill the spaces again to null
function restartgame() {
    spaces.fill(null);

    // after filling null show user blank space
    boxes.forEach(box => {
        box.innerText = " ";
        box.style.backgroundColor = '';
    });


    Result.innerText = "Let's Play!"

    // again when player click it default it to X
    currentPlayer = X_TEXT;
}


startgame();


