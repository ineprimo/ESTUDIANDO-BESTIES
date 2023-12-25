

export default class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, color, difficulty, callback){

        super(scene, x, y);

        // crea la superficie
        this.hitbox = this.scene.add.rectangle(x, y, 50, 30, color);


        // añade el container
		scene.add.existing(this);

		// lo hace interactivo
		this.hitbox.setInteractive();


        // cuando hace click
        this.hitbox.on('pointerdown', () => {

            // callback
            callback(difficulty, this.scene);

        });
    }


    

}