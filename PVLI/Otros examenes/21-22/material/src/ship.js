

export default class Spaceship extends Phaser.GameObjects.Container {
    constructor(scene, x, y, necessaryFuelini){
        super(scene, x, y)

        // crea la imagen de la nave
        //this.myship = this.scene.physics.add.sprite(x, y, 'shipSprite');
        //this.myship.disableBody();

        this.myship2 = this.scene.add.sprite(x, y, 'shipSprite')

        this.myship2.depth = -2;

        this.hitbox = this.scene.add.rectangle(x, y, 16, 50);
        this.scene.physics.add.existing(this.hitbox, true);

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

    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.myship;
    }

    //
    getHitbox(){
        return this.hitbox;
    }


}