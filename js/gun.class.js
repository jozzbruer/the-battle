export default class Gun {
    constructor(name, damage) {
        this.name = name
        this.damage = damage
    }
}


const pistolDamage = 10
const shotgunDamage = 20
const assaultRiffleDamage = 30
const sniperDamage = 40

const knife = new Gun('knife', 2)
const pistol = new Gun('pistol', pistolDamage)
const revolver = new Gun('revolver', pistolDamage)
const sniper = new Gun('sniper', sniperDamage)
const shotgun = new Gun('shotgun', shotgunDamage)
const assaultriffle = new Gun('assaultriffle', assaultRiffleDamage)


export {pistol,revolver, sniper, shotgun, assaultriffle, knife}