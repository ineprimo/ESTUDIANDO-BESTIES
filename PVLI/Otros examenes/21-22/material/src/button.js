

export default class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, color, difficulty, callback){
        super(scene, x, y);

        // crea la superficie
        this.hitbox = this.scene.add.rectangle(x, y, 50, 30, color);


        // añade a la escena donde se haya creado el boton (o a la pasada por scene)
        // este objeto
		scene.add.existing(this);

		// hace al rectangulo this.hitbox interactivo
		this.hitbox.setInteractive();

        // lee cuando hace click ('pointerdown') y ejecuta la funcion indicada en la derecha
        // pide una funcion lambda ()=> { ... } y dentro se llama al callback que le hemos pasado
        // por la constructora como una funcion normal
        // interactive events:
        // 'pointerdown' => haces click en la zona
        // 'pointerover' => pones el cursor encima de la zona
        // 'pointerout'  => sacas el cursor de la zona
        this.hitbox.on('pointerdown', () => {

            // callback
            callback(difficulty, this.scene);

        });

        
    }


    

}