


export default class Fuel extends Phaser.GameObjects.Container {


    constructor(scene, x, y){
        super(scene, x, y);

        this.myfuel = this.scene.physics.add.sprite(x, y, 'fuelSprite');

    }

    
    
    getFuel () {
        console.log("PERO COGE EL FUEL CAGON");
       
        // destruye el sprite de arcade (this.myfuel)
        this.myfuel.destroy(true);

        // destruye el contenedor (this)
        this.destroy(true);
    }
    
    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.myfuel;
    }

}