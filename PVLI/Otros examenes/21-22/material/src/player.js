

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        // en este caso spritesheet (esta como 'jett' ahra pero paso de mirarlo,
        // deberia ser key)
        this.jett = this.scene.physics.add.sprite(x, y, 'jett');

        // añade a la escena (jetpac.js) el objeto entero
        this.scene.add.existing(this);
    }

    

    propulsar(){

        // si la velocidad en la y es mayor que -80 sigue propulsando
        if(this.jett.body.velocity.y > -80){
            this.jett.body.setVelocityY(this.jett.body.velocity.y - 10);
        }

        // this.jett coge el objeto (el sprite), mientras que .body llega a la parte
        // que controla las fisicas. .velocity llega a la velocidad que tiene el
        // body y .y es entendible

        // seVelocityY es un atajo porque creo que se podria hacer un -=

        // animacion
    }



    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.jett;
    }
}