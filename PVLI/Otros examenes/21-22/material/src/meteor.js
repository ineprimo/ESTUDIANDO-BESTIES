


export default class Meteor extends Phaser.GameObjects.Container {
    constructor(scene, x, y){
        super(scene, x, y)

        this.myMeteor = this.scene.physics.add.sprite(x, y, 'meteorSprite');

        // settea la gravedad del sprite de arcade
        this.myMeteor.setGravity(-100, -100);
    }


    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.myMeteor;
    }

}