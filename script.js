// Author: Nazımcan İslam
// Coding: UTF-8
// License: MIT

/**
 * This function regulates the situations where the player chooses to be X.
 */
function userChooseRoleX() {
    hideStartingPage();
    userChoose = 'x';
    computerChoose = 'o';

    console.log('User selected role X.');
}

/**
 * This function regulates the situations where the player chooses to be O.
 */
function userChooseRoleO() {
    hideStartingPage();
    userChoose = 'o';
    computerChoose = 'x';

    console.log('User selected role O.');
}

/**
 * Start and selection screen.
 */
function showStartingPage() {
    startingPage.style.display = 'block';
    
    if (playing) {
        abordGamePage();
    }
    hideBackHomeButton();

    console.log('Starting page is showing.')
}

/**
 * Hide the start screen.
 */
function hideStartingPage() {
    startingPage.style.display = 'none';
    makeGamePage();
    showBackHomeButton();

    console.log('Starting page is hidden.')
}

/**
 * Hides the button that shows the Home Page.
 */
 function hideBackHomeButton() {
    if (backHomeButton.style.display != 'none') {
        backHomeButton.style.display = 'none';

        console.log('Back home button is hidden.');
    }
}

/**
 * Shows the button that shows the Home Page.
 */
function showBackHomeButton() {
    if (backHomeButton.style.display != 'block') {
        backHomeButton.style.display = 'block';

        console.log('Back home button is showing.');
    }
}

/**
 * Make the game board.
 */
function makeGamePage() {
    playing = true;
    gamePage.style.display = 'grid';
    for (var i = 1; i <= 9; i++) {
        var node = document.createElement('div');
        node.classList.add('game-select-box');
        node.id = `id-${i}`;
        node.addEventListener('click', function () {
            var id = this.id.substring(3, 4);
            
            if (tickBox(id, userChoose)) {
                computerPlays();
            }
        });
        gamePage.appendChild(node);
    }

    console.log('Game board created and showing right now.')
}

/**
 * The computer doesn't play very smartly in this game.
 * It just randomly chooses one of the playable pieces, so this function generates a random number between 1 and 9.
 * @returns Random number between 1 and 9
 */
function roleRandomIndex() {
    return Math.floor((Math.random() * 9) + 1);
}

/**
 * Returns the playable tracks in a list.
 * @returns Playable tracks
 */
function getPlayables() {
    var playables = [];
    allBoxesInfo.forEach(box => {
        if (box.mark == null) {
            playables.push(box.id);
        }
    });

    return playables;
}

/**
 * The computer plays by randomly choosing one of the playable pieces.
 */
function computerPlays() {
    var playables = getPlayables();

    if (playables.length > 0) {
        while (true) {
            var randomPlayIndex = roleRandomIndex();
            if (playables.includes(randomPlayIndex)) {
                break;
            }
        }
    }

    tickBox(randomPlayIndex, computerChoose);
}

/**
 * Deletes the game board.
 */
function abordGamePage() {
    playing = false;
    gamePage.style.display = 'none';
    gamePage.innerHTML = null;

    hideBackHomeButton();
    showStartingPage();
    defaultAllBoxesInfo();

    console.log('Game board aborded.');
}

/**
 * It allows the player or the computer to make moves.
 * @param {number} id 
 * @param {string} mark 
 * @returns This function returns 'true' if it did what it was supposed to, and 'false' if it didn't.
 */
function tickBox(id, mark) {
    if (playing) {
        var playablesCount = getPlayables().length;
        if (playablesCount > 0) {
            if (allBoxesInfo[id - 1]['mark'] == null) {
                var node = document.createElement('i');
                node.classList.value = userRoleOptions[mark];
                node.classList.add(`role-${mark}`);

                var piece = gamePage.querySelector(`#id-${id}`);
                piece.innerHTML = null;
                piece.appendChild(node);

                allBoxesInfo[id - 1]['mark'] = mark;
                moves[mark].push(Number(id));

                console.log(`${mark.toUpperCase()} player played on box ${id}`);

                checkWinner(mark);

                return true;
            }
        }
    }

    return false;
}

/**
 * Check the winner.
 * If no one wins, show it's tie.
 * @param {string} mark 
 */
function checkWinner(mark) {
    var winner = false;
    winableMoves.forEach(winable => {
        var point = 0;
        winable.forEach(x => {
            if (moves[mark].includes(x)) {
                point++;
            }
        });

        if (point >= 3) {
            winner = true;
            showWinnerMessageBox(mark);
            return;
        }
    });

    if (!winner && getPlayables().length == 0) {
        showWinnerMessageBox('tie');
    }
}

/**
 * Show a box that will reveal the winner.
 * @param {string} mark 
 */
function showWinnerMessageBox(mark) {
    endGamePage.style.display = 'block';
    var header = endGamePage.querySelector('#result-header');

    if (mark == userChoose) {
        header.innerText = 'You won!';
    } else if (mark == computerChoose) {
        header.innerText = 'You lost!';
    } else {
        header.innerText = 'It is tie!';
    }

    console.log('Winner page is showing.');
}

/**
 * Returns to the main page.
 */
function winnerPageGoToHome() {
    endGamePage.style.display = 'none';
    abordGamePage();
}

/**
 * Restarts the game.
 */
function winnerPagePlayAgain() {
    endGamePage.style.display = 'none';
    abordGamePage();
    hideStartingPage();
}

/**
 * Returns values to default.
 */
function defaultAllBoxesInfo() {
    moves = {
        'x': [],
        'o': []
    };
    allBoxesInfo = [];
    for (var i = 1; i <= 9; i++) {
        var box = {
            'id': i,
            'mark': null
        }
        allBoxesInfo.push(box);
    }

    console.log('All values defaulted.');
}

var userRoleOptions = {
    'x': 'fa-solid fa-x',
    'o': 'fa-solid fa-o'
}
var userChoose = null;
var computerChoose = null;

var allBoxesInfo = [];

var playing = false;
var moves;
var winableMoves = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
]

defaultAllBoxesInfo();

var startingPage = document.getElementById('starting-game');
var gamePage = document.getElementById('game-page');
var backHomeButton = document.getElementById('back-home-button');
backHomeButton.onclick = showStartingPage;

var endGamePage = document.getElementById('end-game-page');

var roleXButton = document.getElementById('role-x');
roleXButton.onclick = userChooseRoleX;

var roleOButton = document.getElementById('role-o');
roleOButton.onclick = userChooseRoleO;

var goToHomeButton = document.getElementById('go-to-home-button');
goToHomeButton.onclick = winnerPageGoToHome;

var playAgainButton = document.getElementById('play-again-button');
playAgainButton.onclick = winnerPagePlayAgain;

showStartingPage();
