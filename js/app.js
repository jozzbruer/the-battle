const rows = 10
const cols = 10

const obstacleVarience = 0.12 //12 % of the map are obstacles


let board_map = []

let guns = ['hand_gun', 'revolver_38', 'revolver_22','shot_gun_cross', 'shot_gun_simple']

const addBox = (className) =>{
    let board = document.getElementById('board')
    let box = document.createElement('div')
    box.setAttribute('class','box ' + className )
    board.append(box)
}

const clearBoard = () =>{
   document.getElementById('board').innerHTML = ""
}

const draw_board = (arr) =>{
    clearBoard()
    addObstacles(board_map)
    addPlayers(board_map, 'player1')
    addPlayers(board_map, 'player2')
    addGuns(board_map, guns)
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            addBox(arr[i][j])
                        
        }
        
    }
}

/* Reset boardmap */
const addFreeSpaces = (arr) =>{
    for (let i = 0; i < rows; i++){
        arr.push([])
        for (let j = 0; j < cols; j++){  
            arr[i][j] = 'free'            
        }
    }

}

const addObstacles = (arr) =>{
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

const addPlayers = (arr, className) =>{

    let i = 0
    let randomI
    let randomJ
    while (i < 1  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (arr[randomI][randomJ] === 'free'){
            arr[randomI][randomJ] = className
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


const addGuns = (arr1, arr2) =>{

    let i = 0
    let k = 0
    let randomI
    let randomJ
    while (i < arr2.length  ){
        randomI = Math.floor(Math.random() * rows)
        randomJ = Math.floor(Math.random() * cols)
        if (arr1[randomI][randomJ] === 'free'){
            arr1[randomI][randomJ] = arr2[k]
            i++
            k++
        }
    }
}
 addFreeSpaces(board_map)
 draw_board(board_map)


