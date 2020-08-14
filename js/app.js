/*
 ** Project Name: Board Game OPC Front-End Developer Path
 ** Author: Joz-Bruer Quince
 ** Started Date: July 01 2020
 ** Realease Date:
 ** Licence: MIT
 */
import {
    player1,
    player2
} from "./player.class.js";
import {
    pistol,
    revolver,
    sniper,
    shotgun,
    assaultriffle,
} from "./gun.class.js";

/*
 ** Add data to the score board for the player one
 **
 */



const scoreBoard = document.querySelectorAll('.score-board-text')
scoreBoard[0].classList.add('selected')

const player1SB = document.querySelectorAll("#player1")
const player2SB = document.querySelectorAll("#player2")
const player1Modal = document.querySelector("#player1Modal")
const player2Modal = document.querySelector("#player2Modal")

const rows = 10;
const cols = 10;

const obstacleVarience = 0.12; //12 % of the map are obstacles

/*
 ** Create guns constant object
 ** Create player constant object
 */
const players = [player1, player2];
const guns = [pistol, sniper, revolver, shotgun, assaultriffle];

let currentPlayer = players[0];
let currentMoves = 0;
const maxMoves = 3;

const resultBoard = () => {
    let player1arr = [
        players[0].name,
        players[0].gun.name,
        players[0].life,
        players[0].gun.damage,
    ];
    let player2arr = [
        players[1].name,
        players[1].gun.name,
        players[1].life,
        players[1].gun.damage,
    ];
    let i = 0;
    let j = 0;

    player1SB.forEach(element => {
        element.innerText = player1arr[i];
        i++;
    });

    player2SB.forEach(element => {
        element.innerText = player2arr[j];
        j++;
    });
    player1Modal.innerText = players[0].gun.name
    player2Modal.innerText = players[1].gun.name
};

let boardMap = [];

const addBox = (className) => {
    let board = document.getElementById("board");
    let box = document.createElement("div");
    box.setAttribute("class", "box " + className);
    board.append(box);
};

const clearBoard = () => {
    document.getElementById("board").innerHTML = "";
};

const draw = () => {
    clearBoard();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            addBox(boardMap[i][j]);
        }
    }
    resultBoard();

};

const generateBoard = () => {
    boardMap = [];
    addFreeSpaces();
    addObstacles();
    addPlayers();
    addGuns(guns);
};

/* Reset boardmap */
const addFreeSpaces = () => {
    for (let i = 0; i < rows; i++) {
        boardMap.push([]);
        for (let j = 0; j < cols; j++) {
            boardMap[i][j] = "free";
        }
    }
};

const addObstacles = () => {
    let i = 0;
    const numOfObstacles = obstacleVarience * rows * cols;
    let randomI;
    let randomJ;

    while (i < numOfObstacles) {
        randomI = Math.floor(Math.random() * rows);
        randomJ = Math.floor(Math.random() * cols);
        if (boardMap[randomI][randomJ] === "free") {
            boardMap[randomI][randomJ] = "obstacle";
            i++;
        }
    }
};

const addPlayers = () => {
    let i = 0;
    let randomI;
    let randomJ;
    while (i < players.length) {
        randomI = Math.floor(Math.random() * rows);
        randomJ = Math.floor(Math.random() * cols);
        if (boardMap[randomI][randomJ] === "free") {
            boardMap[randomI][randomJ] = players[i].name;
            players[i].setPosition(randomI, randomJ);
            i++;
        }
    }
};

const addGuns = () => {
    let i = 0;
    let randomI;
    let randomJ;
    while (i < guns.length) {
        randomI = Math.floor(Math.random() * rows);
        randomJ = Math.floor(Math.random() * cols);
        if (boardMap[randomI][randomJ] === "free") {
            boardMap[randomI][randomJ] = guns[i].name;
            i++;
        }
    }
};


const move = (newX, newY) => {
    // Check if newX and newY are within 0 to rows and 0 to cols
    if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        if (boardMap[newX][newY] === "free") {
            let [oldX, oldY] = [currentPlayer.x, currentPlayer.y];
            boardMap[oldX][oldY] = "free";
            boardMap[newX][newY] = currentPlayer.name;
            currentPlayer.setPosition(newX, newY);
            draw();
            currentMoves++;
            checkMaxMoves();
        } else if (
            boardMap[newX][newY] === "pistol" ||
            boardMap[newX][newY] === "sniper" ||
            boardMap[newX][newY] === "revolver" ||
            boardMap[newX][newY] === "assaultriffle" ||
            boardMap[newX][newY] === "shotgun"
        ) {
            // Check the players gun
            let newGunName = boardMap[newX][newY];
            let newGun = guns.filter(gun => gun.name === newGunName)[0]
            let [oldX, oldY] = [currentPlayer.x, currentPlayer.y];
            if (currentPlayer.gun.name === "knife") {
                boardMap[oldX][oldY] = "free";
            } else {
                let oldGun = currentPlayer.gun;
                boardMap[oldX][oldY] = oldGun.name
            }
            boardMap[newX][newY] = currentPlayer.name;
            currentPlayer.setPosition(newX, newY);
            currentPlayer.gun = newGun;
            draw();
            currentMoves++;
            checkMaxMoves();
        }
    }
};

const checkMaxMoves = () => {
    if (currentMoves >= maxMoves) {
        switchPlayer();
    }
};

const switchPlayer = () => {
    if (currentPlayer.name === "player1") {
        currentPlayer = players[1]
        scoreBoard[0].classList.remove('selected')
        scoreBoard[1].classList.add('selected')

    } else {
        currentPlayer = players[0]
        scoreBoard[0].classList.add('selected')
        scoreBoard[1].classList.remove('selected')
    }
    currentMoves = 0;
};

// const checkBattleCondition = () => {

// }


const handleKey = (e) => {
    e.preventDefault();

    switch (e.which) {
        case 37:
            move(currentPlayer.x, currentPlayer.y - 1);
            break;
        case 38:
            move(currentPlayer.x - 1, currentPlayer.y);
            break;
        case 39:
            move(currentPlayer.x, currentPlayer.y + 1);
            break;
        case 40:
            move(currentPlayer.x + 1, currentPlayer.y);
            break;
    }
};

generateBoard();
draw();

document.addEventListener("keydown", handleKey);



/**
 * Modal events
 */

const open = document.getElementById('open')
const modalContainer = document.getElementById('modal_container')
const close = document.getElementById('close')


open.addEventListener('click', () => {
    modalContainer.classList.add('show')
})
close.addEventListener('click', () => {
    modalContainer.classList.remove('show')
})