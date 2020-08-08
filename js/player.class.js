import {
    knife
} from "./gun.class.js"

class Player {
    constructor(name, gun, life) {
        this.name = name
        this.gun = gun
        this.life = life
        this.x = -1
        this.y = -1
    }

    setPosition = (x, y) => {
        this.x = x
        this.y = y
    }
}

const max_health = 100

const player1 = new Player('player1', knife, max_health)
const player2 = new Player('player2', knife, max_health)

export {
    player1,
    player2
}