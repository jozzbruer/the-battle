import  Player   from './player.class.js'
import Gun from "./gun.class.js"

const rows = 10
const cols = 10

const obstacleVarience = 0.12 //12 % of the map are obstacles
const knife = new Gun('knife', 2)
const max_health = 100
const player1 = new Player('player1',knife, max_health)
const player2 = new Player('player2',knife, max_health)
/*
    Create guns constant object
*/

const hand_gun = new Gun('hand_gun',10)
const revolver_38 = new Gun('revolver_38',10)
const revolver_22 = new Gun('revolver_22',10)
const shot_gun_cross = new Gun('shot_gun_cross',10)
const shot_gun_simple = new Gun('shot_gun_simple',10)

const players = [player1,player2]
const guns = [hand_gun,revolver_22, revolver_38,shot_gun_cross,shot_gun_simple]

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

// const addPlayer2 = (arr) =>{

//     let i = 0
//     let randomI
//     let randomJ
//     while (i < 1  ){
//         randomI = Math.floor(Math.random() * rows)
//         randomJ = Math.floor(Math.random() * cols)
//         if (arr[randomI][randomJ] === 'free'){
//             arr[randomI][randomJ] = 'player2'
//             i++
//         }
//     }
// }


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
 generateBoard()
 draw()