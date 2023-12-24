

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, anim) {
        super(scene, x, y);

        /*
        this.pl = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0); 
        this.pl.setScale(2,2);
        this.add(this.pl);
        */

        


    }

    preUpdate(t, dt) {
    
        // llama al preupdate de la clase superior (clase padre)
        // porque si no no sabe que hay que llamarla
        super.preUpdate(t, dt)


    }

}