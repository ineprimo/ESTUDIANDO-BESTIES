


export default class Meteor extends Phaser.GameObjects.Container {
    constructor(scene, x, y){
        super(scene, x, y)

        this.myMeteor = this.scene.physics.add.sprite(x, y, 'meteorSprite');

        // settea la gravedad del sprite de arcade (x, y), (la y esta a -100 que cancela la 
        // gravedad del juego defaul pero quiero cambiar esto y en vez de gravedad darle
        // velocidad y ya)
        this.myMeteor.setGravity(0, -100);

        this.myMeteor.body.setVelocityX(-100);
        this.myMeteor.body.setVelocityY(50);

        this.dead = false;

        this.scene.add.existing(this);
    }


    preUpdate(t, dt) {

        if(this.myMeteor.x <= 0){
            this.myMeteor.x = this.scene.sys.game.canvas.width;

        }
        else if(this.myMeteor.x >= this.scene.sys.game.canvas.width){
            this.myMeteor.x = 0;
        }


        console.log(this.dead);

        // si se pasa de altura
        if(this.myMeteor.y > this.scene.sys.game.canvas.height || this.dead == true){

            this.deleteMeteor();
        }



    }



    deleteMeteor(){

        // destruye el sprite de arcade (this.myfuel)
        this.myMeteor.destroy(true);

        // destruye el contenedor (this)
        this.destroy(true);
    }

    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.myMeteor;
    }

}