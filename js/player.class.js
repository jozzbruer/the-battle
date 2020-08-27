import {
    knife
} from "./gun.class.js"

class Player {
    constructor(name, gun, life) {
        this.name = name
        this.gun = gun
        this.life = life
        this.alive = true
        this.defence = false
        this.x = -1
        this.y = -1
    }

    setPosition = (x, y) => {
        this.x = x
        this.y = y
    }

    takeLife = (damage) => {
        if (this.defence) {
            this.life = this.life - (damage / 2)
            this.defence = false
        } else {
            this.life = this.life - damage
        }

        if (this.life <= 0) {
            this.alive = false
            this.life = 0
        }
    }
}

const max_health = 100

const player1 = new Player('player1', knife, max_health)
const player2 = new Player('player2', knife, max_health)

export {
    player1,
    player2
}