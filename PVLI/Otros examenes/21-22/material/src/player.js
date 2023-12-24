

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.jett = new Phaser.GameObjects.Sprite(scene, x, y, key, 0); 

        //scene.add.container(this.jett);

        this.jett.setScale(1,1);
        this.add(this.jett);


        //this.jett3 = scene.add.sprite(new Phaser.GameObjects.Sprite(scene, 20, 20, key, 0));

        //this.jett2 = scene.add.sprite(100, 20, 'jett');

        
        
        //this.jett.setScale(2,2);
		//this.scene.add(this.jett);
        //console.log(this.jett.x);

        // añade fisicas al objeto
        //this.scene.physics.add.existing(this);


    }

    preUpdate(t, dt) {
    
        // llama al preupdate de la clase superior (clase padre)
        // porque si no no sabe que hay que llamarla
        super.jett.preUpdate(t, dt)

       
        console.log(jett.x + " " + this.jett.y);

    }


    propulsar(){

        console.log("holiwis");


    }

}