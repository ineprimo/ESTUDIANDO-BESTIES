

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.jett = new Phaser.GameObjects.Sprite(scene, x, y, key, 3); 

        // crea el sprite inicial
        this.jett2 = this.scene.add.image(x, y, key);
        this.scene.add.existing(this);


        // le añade fisicas
        this.scene.physics.add.existing(this.jett2);
   

        // lo mete en la escena
        //this.scene.add(this.jett);
    }

    preUpdate(t, dt) {
    
        // llama al preupdate de la clase superior (clase padre)
        // porque si no no sabe que hay que llamarla
    

    }


    propulsar(){

        // si la velocidad en la y es mayor que -80 sigue propulsando
        if(this.jett2.body.velocity.y > -80){
            this.jett2.body.setVelocityY(this.jett2.body.velocity.y - 10);
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