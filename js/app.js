/*
 ** Project Name: Board Game OPC Front-End Developer Path
 ** Author: Joz-Bruer Quince
 ** Started Date: July 01 2020
 ** Realease Date:
 ** Licence: MIT
 */
import { player1, player2 } from "./player.class.js";
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

const scoreBoard = document.querySelectorAll(".score-board-text");
scoreBoard[0].classList.add("selected");

const player1SB = document.querySelectorAll("#player1");
const player2SB = document.querySelectorAll("#player2");
const player1Modal = document.querySelector("#player1Modal");
const player2Modal = document.querySelector("#player2Modal");
const progressBarP1 = document.getElementById("bar1");
const progressBarP2 = document.getElementById("bar2");

// Attack and deffend button
const attack1 = document.getElementById("attack1");
const attack2 = document.getElementById("attack2");
const deffence1 = document.getElementById("deffence1");
const deffence2 = document.getElementById("deffence2");

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

  player1SB.forEach((element) => {
    element.innerText = player1arr[i];
    i++;
  });

  player2SB.forEach((element) => {
    element.innerText = player2arr[j];
    j++;
  });
  player1Modal.innerText = players[0].gun.name;
  player2Modal.innerText = players[1].gun.name;

  // Add value to the modal board
  progressBarP1.style.width = `${players[0].life}%`;
  progressBarP2.style.width = `${players[1].life}%`;
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
  updateSwitchBorder();
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
      if (checkBattleMode() == true) {
        showBattleScreen();
      } else {
        currentMoves++;
        checkMaxMoves();
      }
    } else if (
      boardMap[newX][newY] === "pistol" ||
      boardMap[newX][newY] === "sniper" ||
      boardMap[newX][newY] === "revolver" ||
      boardMap[newX][newY] === "assaultriffle" ||
      boardMap[newX][newY] === "shotgun"
    ) {
      // Check the players gun
      let newGunName = boardMap[newX][newY];
      let newGun = guns.filter((gun) => gun.name === newGunName)[0];
      let [oldX, oldY] = [currentPlayer.x, currentPlayer.y];
      if (currentPlayer.gun.name === "knife") {
        boardMap[oldX][oldY] = "free";
      } else {
        let oldGun = currentPlayer.gun;
        boardMap[oldX][oldY] = oldGun.name;
      }
      boardMap[newX][newY] = currentPlayer.name;
      currentPlayer.setPosition(newX, newY);
      currentPlayer.gun = newGun;
      draw();
      if (checkBattleMode() == true) {
        showBattleScreen();
      } else {
        currentMoves++;
        checkMaxMoves();
      }
    }
    // checkBattleCondition()
  }
};

const checkMaxMoves = () => {
  if (currentMoves >= maxMoves) {
    switchPlayer();
  }
};
const updateSwitchBorder = () => {
  if (currentPlayer.name === "player2") {
    scoreBoard[0].classList.remove("selected");
    scoreBoard[1].classList.add("selected");
  } else {
    scoreBoard[0].classList.add("selected");
    scoreBoard[1].classList.remove("selected");
  }
};
const switchPlayer = () => {
  if (currentPlayer.name === "player1") {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
  //   updateSwitchBorder();
  currentMoves = 0;
};

const checkBattleMode = () => {
  let nextPlayer = getOtherPlayer();

  if (
    boardMap[currentPlayer.x + 1][currentPlayer.y] === nextPlayer.name ||
    boardMap[currentPlayer.x - 1][currentPlayer.y] === nextPlayer.name ||
    boardMap[currentPlayer.x][currentPlayer.y + 1] === nextPlayer.name ||
    boardMap[currentPlayer.x][currentPlayer.y - 1] === nextPlayer.name
  ) {
    //  disable the keypress event
    // modalContainer.classList.add('show')
    return true;
  }

  return false;
};

const showBattleScreen = () => {
  //disable key press event
  // document.addEventListener("keydown", disableKeyPress);
  attack1.addEventListener("click", attack);
  attack2.addEventListener("click", attack);
  deffence1.addEventListener("click", defend);
  deffence2.addEventListener("click", defend);
  enableDisableButtons();
  modalContainer.addClass("show"); // Jquery Syntax
};

const getOtherPlayer = () => {
  if (currentPlayer.name === "player1") return players[1];
  else return players[0];
};

const enableDisableButtons = () => {
  if (currentPlayer.name === "player1") {
    document.getElementById("attack1").removeAttribute("disabled");
    document.getElementById("attack2").setAttribute("disabled", true);
    document.getElementById("deffence1").removeAttribute("disabled");
    document.getElementById("deffence2").setAttribute("disabled", true);
  } else {
    document.getElementById("attack2").removeAttribute("disabled");
    document.getElementById("attack1").setAttribute("disabled", true);
    document.getElementById("deffence2").removeAttribute("disabled");
    document.getElementById("deffence1").setAttribute("disabled", true);
  }
};

const attack = (e) => {
  console.log("attack");
  let otherPlayer = getOtherPlayer();
  otherPlayer.takeLife(currentPlayer.gun.damage);
  if (otherPlayer.alive) {
    switchPlayer();
    enableDisableButtons();
  } else {
    // Hide battle modal, show the game over modal
    modalContainer.removeClass("show"); // Jquery Syntax
    gameOverModal.addClass("show"); //Jquery Syntax
    showWinner();
  }
  resultBoard();
};

const defend = (e) => {
  currentPlayer.defence = true;
  switchPlayer();
  enableDisableButtons();
  resultBoard();
};
const disableKeyPress = (e) => {
  e.preventDefault();
};
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

// Show the winner of the battle

const showWinner = () => {
  if (players[0].alive) playerWin.text(`${players[0].name} win the battle`);
  // Jquery Syntax
  else playerWin.text(`${players[1].name} win the battle`); // Jquery Syntax
};

generateBoard();
draw();

// Move the players
document.addEventListener("keydown", handleKey);

/**
 * Modal events using Jquery
 */

const modalContainer = $("#modal_container"); //Jquery Syntax
const replay = $("#close");
const gameOverModal = $("#game-over");
const playerWin = $(".win");

replay.on("click", () => {
  gameOverModal.removeClass("show");
  location.reload();
});
