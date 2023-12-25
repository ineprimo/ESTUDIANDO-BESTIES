

export default class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, color, callback){

        super(scene, x, y);

        this.hitbox = this.scene.add.rectangle(x, y, 50, 30, color);


        // añade el container
		scene.add.existing(this);

		// lo hace interactivo
		this.box.setInteractive();

        console.log(this.hitbox);
    }


    

}