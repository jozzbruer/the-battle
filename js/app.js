/*
** Project Name: Board Game OPC Front-End Developer Path 
** Author: Joz-Bruer Quince
** Started Date: July 01 2020
** Realease Date:
** Licence: MIT
*/
import  {player1, player2}   from './player.class.js'
import  {pistol,revolver,sniper,shotgun,assaultriffle} from "./gun.class.js"

const rows = 10
const cols = 10

const obstacleVarience = 0.12 //12 % of the map are obstacles
//const knife = new Gun('knife', 2)



let currentPlayer = player1
let currentMoves = 0
const maxMoves = 3
/*
    Create guns constant object
*/


const players = [player1,player2]
const guns = [pistol,sniper, revolver,shotgun,assaultriffle]

let board_map = []

//let guns = ['hand_gun', 'revolver_38', 'revolver_22','shot_gun_cross', 'shot_gun_simple']

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
            addBox(board_map[i][j])              
        }
        
    }
}

const generateBoard = () =>{
    board_map = []
    addFreeSpaces()
    addObstacles()
    addPlayers()
    addGuns(guns)
}

/* Reset boardmap */
const addFreeSpaces = () =>{
    for (let i = 0; i < rows; i++){
        board_map.push([])
        for (let j = 0; j < cols; j++){  
            board_map[i][j] = 'free'            
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
        if (board_map[randomI][randomJ] === 'free'){
            board_map[randomI][randomJ] = 'obstacle'
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
        if (board_map[randomI][randomJ] === 'free'){
            board_map[randomI][randomJ] = players[i].name
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
        if (board_map[randomI][randomJ] === 'free'){
            board_map[randomI][randomJ] = guns[i].name
            i++
        }
    }
}

const move = (newX, newY) =>{
    // Check if newX and newY are within 0 to rows and 0 to cols
    if (board_map[newX][newY] === 'free'){
        let [oldX, oldY] = [currentPlayer.x, currentPlayer.y]
        board_map[oldX][oldY] = 'free'
        board_map[newX][newY] = currentPlayer.name
        currentPlayer.setPosition(newX,newY)
        draw()
    }
}

const handleKey = (e) => {
    e.preventDefault()
    console.log(e.which)

    switch (e.which){
        case 38: 
            move(currentPlayer.x - 1, currentPlayer.y)
            break
    }
}

 generateBoard()
 draw()
 
 document.addEventListener('keydown', handleKey)