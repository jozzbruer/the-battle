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

    let randomI
    let randomJ
    for (let i = 0; i < arr.length + 2; i++){
        randomI = Math.floor(Math.random() * arr.length)
        for (let j = 0; j < arr.length + 2; j++){
             randomJ = Math.floor(Math.random() * arr.length)
        }
        arr[randomI][randomJ] = 'obstacle'
    }

}

function addPlayer1(arr){

    let randomI
    let randomJ
    for (let i = 0; i < 1; i++){
        randomI = Math.floor(Math.random() * arr.length)
        for (let j = 0; j < 1; j++){
             randomJ = Math.floor(Math.random() * arr.length)
        }
        if (arr[randomI][randomJ] === 'free')
            arr[randomI][randomJ] = 'player1'
        else
            arr[randomI++][randomJ] = 'player1'
    }

}

function addPlayer2(arr){

    let randomI
    let randomJ
    for (let i = 0; i < 1; i++){
        randomI = Math.floor(Math.random() * arr.length)
        for (let j = 0; j < 1; j++){
             randomJ = Math.floor(Math.random() * arr.length)
        }
        if (arr[randomI][randomJ] === 'free')
            arr[randomI][randomJ] = 'player2'
        else
            arr[randomI++][randomJ] = 'player2'
    }

}

draw_board()



/*
    1- Using the board map write a draw function that will read throught each value of board map
    and use addbox function to insert the appropriate class into the board

    Nested for loop
*/

})