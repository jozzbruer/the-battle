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
    var board = document.getElementById('board')
    var box = document.createElement('div')
    box.setAttribute('class','box ' + className )
    board.append(box)
}

function clearBoard(){
    document.getElementById('board').innerHTML = ""
}

/*
    1- Using the board map write a draw function that will read throught each value of board map
    and use addbox function to insert the appropriate class into the board

    Nested for loop
*/