

export default class Player extends Phaser.GameObjects.Sprite {

    //
    constructor(scene, x, y, ) {
        super(scene, x, y, 'Player');
      }

      preUpdate(t, dt) {
        
        // llama al preupdate de la clase superior (clase padre)
        // porque si no no sabe que hay que llamarla
        super.preUpdate(t, dt)


        
        
        // mov debug placeholder
        //this.y += 2 * dt / 1000;

      }

}