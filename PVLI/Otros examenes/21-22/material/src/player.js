

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        //this.jett = new Phaser.GameObjects.Sprite(this.scene, x, y, key, 3); 
        this.jett = this.scene.physics.add.sprite(x, y, 'jett');

        //this.scene.physics.add.sprite(x, y, key);

        // crea el sprite inicial
        this.scene.add.existing(this);

        // Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		//scene.physics.add.existing(this);
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


    getSprite(){
        return this.jett;
    }
}