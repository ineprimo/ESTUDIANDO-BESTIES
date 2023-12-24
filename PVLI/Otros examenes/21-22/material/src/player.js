

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        //this.jett = new Phaser.GameObjects.Sprite(scene, x, y, key, 3); 

        // crea el sprite inicial
        this.jett = this.scene.add.image(x, y, key);


        // le añade fisicas
        this.scene.physics.add.existing(this.jett);

        

        // lo mete en la escena
        //this.scene.add(this.jett);
    }

    preUpdate(t, dt) {
    
        // llama al preupdate de la clase superior (clase padre)
        // porque si no no sabe que hay que llamarla
        super.jett.preUpdate(t, dt)

    }


    propulsar(){

        console.log("holiwis");

        
        //this.jett.y -= 10;


        if(this.jett.body.velocity.y > -80){
            this.jett.body.setVelocityY(this.jett.body.velocity.y - 10);
        }


    }


    getX(){
        console.log(this.jett.x);
    }
}