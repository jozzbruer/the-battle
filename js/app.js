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
    for (let i = 0; i < board_map.length; i++){
        for (let j = 0; j < board_map.length; j++){
            addBox(board_map[i][j])
                        
        }
        
    }
    
   
}

function addObstacles(arr){

    let randomI
    let randomJ
    for (let i = 0; i < arr.length; i++){
        randomI = Math.floor(Math.random() * arr.length)
        for (let j = 0; j < arr.length; j++){
             randomJ = Math.floor(Math.random() * arr.length)
        }
        arr[randomI][randomJ] = 'obstacle'
    }

        

}

draw_board()



/*
    1- Using the board map write a draw function that will read throught each value of board map
    and use addbox function to insert the appropriate class into the board

    Nested for loop
*/