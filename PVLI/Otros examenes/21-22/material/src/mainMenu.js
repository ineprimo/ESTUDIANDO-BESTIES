import Button from './button.js'


export default class MainMenu extends Phaser.Scene {

    // constructora de la clase
    constructor(){

        // como se va a llamar la escena en el config del game 
        super({ key: 'MainMenu'})
    }


    preload(){

        // carga el archivo con los patrones para el mapa (solo lo visual)
        this.load.image('mapSprites', './assets/sprites/tileset.png');

    }

    create(){

        //this.hitbox = this.add.rectangle(50, 30, 50, 30, 0x6666ff);

        this.but = new Button(this, 50, 30, 0x63ff4f);
        console.log(this.hitbox);


    }
}