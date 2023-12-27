

export default class Spaceship extends Phaser.GameObjects.Container {
    constructor(scene, x, y, necessaryFuelini){
        super(scene, x, y)

        // crea la imagen de la nave
        this.myship = this.scene.physics.add.sprite(x, y, 'shipSprite');

        // crea el contador de combustible necesario para ganar
        this.necessaryFuel = necessaryFuelini;

        // contador del fuel actual
        this.currentFuel = 0;
    }


    // añade combustible a la nave
    addFuel(){
        //
        this.currentFuel += 1;
    }


    // devuelve si la nave ha sido completamente cargada o no
    isComplete(){
        return this.currentFuel == this.necessaryFuel;
    }


}