document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('board').innerHTML = ""
// ""
// var box = document.createElement('div')
// undefined
// box
// <div>​</div>​
// box.setAttribute('class','box free')
// undefined
// box
// <div class=​"box free">​</div>​
// var board = document.getElementById('board')
// undefined
// board.append(box)
// undefined
// board.append(box)
const rows = 10
const cols = 10

const obstacleVarience = 0.12 //12 % of the map are obstacles

let board_map = [
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free'],
    ['free','free','free','free','free','free','free','free','free','free']

]

//let board_map = []

let guns = ['hand_gun', 'revolver_38', 'revolver_22','shot_gun_cross', 'shot_gun_simple']



function addBox(className){
    let board = document.getElementById('board')
    let box = document.createElement('div')
    box.setAttribute('class','box ' + className )
    board.append(box)
}

function clearBoard(){
    document.getElementById('board').innerHTML = ""
}

function draw_board(){
    clearBoard()
    addObstacles(board_map)
    addPlayer1(board_map)
    addPlayer2(board_map)
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            addBox(board_map[i][j])
                        
        }
        
    }
}
/* Reset boardmap */
function addFreeSpaces(){

}

function addObstacles(arr){
    let i = 0
    const numOfObstacles = obstacleVarience * rows * cols
    let randomI
    let randomJ

    while (i < numOfObstacles  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (arr[randomI][randomJ] === 'free'){
            arr[randomI][randomJ] = 'obstacle'
            i++
        }
    }
}

function addPlayer1(arr){

    let i = 0
    let randomI
    let randomJ
    while (i < 1  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (arr[randomI][randomJ] === 'free'){
            arr[randomI][randomJ] = 'player1'
            i++
        }
    }
}

function addPlayer2(arr){

    let i = 0
    let randomI
    let randomJ
    while (i < 1  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (arr[randomI][randomJ] === 'free'){
            arr[randomI][randomJ] = 'player2'
            i++
        }
    }
}

draw_board()



/*
    1- Using the board map write a draw function that will read throught each value of board map
    and use addbox function to insert the appropriate class into the board

    Nested for loop
*/

})