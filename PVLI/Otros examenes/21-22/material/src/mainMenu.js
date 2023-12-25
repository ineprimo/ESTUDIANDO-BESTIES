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

        // crea el boton
        this.but = new Button(this, 50, 30, 0x63ff4f, 'easy', this.playGame);
    }


    playGame(mode){
        // debug
        console.log("vas a jugar modo: " +  mode);

        // cambia de escena y le pasa la difficultad
        //

    }
}