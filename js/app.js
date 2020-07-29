/*
** Project Name: Board Game OPC Front-End Developer Path 
** Author: Joz-Bruer Quince
** Started Date: July 01 2020
** Realease Date:
** Licence: MIT
*/
import  {player1, player2}   from './player.class.js'
import  {pistol,revolver,sniper,shotgun,assaultriffle} from "./gun.class.js"

/*
** Add data to the score board for the player one
**
*/

const player1SB = document.querySelectorAll('#player1')
let p = [player1.name,player1.gun['name'],player1.life, player1.gun['damage']]




const rows = 10
const cols = 10

const obstacleVarience = 0.12 //12 % of the map are obstacles


/*
** Create guns constant object
** Create player constant object
*/
const players = [player1,player2]
const guns = [pistol,sniper, revolver,shotgun,assaultriffle]


let currentPlayer = players[1]
let currentMoves = 0
const maxMoves = 3





let boardMap = []


const addBox = (className) =>{
    let board = document.getElementById('board')
    let box = document.createElement('div')
    box.setAttribute('class','box ' + className )
    board.append(box)
}

const clearBoard = () =>{
   document.getElementById('board').innerHTML = ""
}

const draw = () =>{
    clearBoard()
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            addBox(boardMap[i][j])              
        }
        
    }
}

const generateBoard = () =>{
    boardMap = []
    addFreeSpaces()
    addObstacles()
    addPlayers()
    addGuns(guns)
}

/* Reset boardmap */
const addFreeSpaces = () =>{
    for (let i = 0; i < rows; i++){
        boardMap.push([])
        for (let j = 0; j < cols; j++){  
            boardMap[i][j] = 'free'            
        }
    }

}

const addObstacles = () =>{
    let i = 0
    const numOfObstacles = obstacleVarience * rows * cols
    let randomI
    let randomJ

    while (i < numOfObstacles  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (boardMap[randomI][randomJ] === 'free'){
            boardMap[randomI][randomJ] = 'obstacle'
            i++
        }
    }
}

const addPlayers = () =>{

    let i = 0
    let randomI
    let randomJ
    while (i < players.length  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (boardMap[randomI][randomJ] === 'free'){
            boardMap[randomI][randomJ] = players[i].name
            players[i].setPosition(randomI,randomJ)
            i++
        }
    }
}


const addGuns = () =>{

    let i = 0
    let randomI
    let randomJ
    while (i < guns.length  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (boardMap[randomI][randomJ] === 'free'){
            boardMap[randomI][randomJ] = guns[i].name
            i++
        }
    }
}

const move = (newX, newY) =>{
    // Check if newX and newY are within 0 to rows and 0 to cols
    if (boardMap[newX][newY] === 'free'){
        let [oldX, oldY] = [currentPlayer.x, currentPlayer.y]
        boardMap[oldX][oldY] = 'free'
        boardMap[newX][newY] = currentPlayer.name
        currentPlayer.setPosition(newX,newY)
        draw()
    }
}

const handleKey = (e) => {
    e.preventDefault()
    
    switch (e.which){
        case 37: 
        move(currentPlayer.x, currentPlayer.y - 1)
        break
        case 38:
            move(currentPlayer.x - 1, currentPlayer.y)
            break
        case 39:
            move(currentPlayer.x , currentPlayer.y + 1)
            break
        case 40:
            move(currentPlayer.x + 1, currentPlayer.y)
            break
    }
}

 generateBoard()
 draw()
 
 document.addEventListener('keydown', handleKey)