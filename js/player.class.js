export default class Player {
    constructor(name, gun, life) {
        this.name = name
        this.gun = gun
        this.life = life
        this.x = -1
        this.y = -1
    }

    setPosition = (x,y) => {
        this.x = x
        this.y = y
    } 
}