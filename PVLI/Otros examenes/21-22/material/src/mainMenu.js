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

        // crea el boton y le pasa la escena (this), la posicion x y, el color del boton
        // (este es de color verde), la dificultad de la partida cuando se cargue y
        // el metodo que se ejecutara cuando se pulse el boton. 
        // CALLBACK: metodo que se pasa como un atributo/variable por otro metodo
        // para poder usarlo luego dentro del propio metodo. En js se pasa sin
        // parentesis (aun no se por que pero si no no te deja usarlo y te pide una
        // funcion, puede que sea por eso)
        this.easyButton = new Button(this, 50, 30, 0x63ff4f, 'easy', this.playGame);

        this.midButton = new Button(this, 50, 90, 0xe2ff29, 'mid', this.playGame);

        this.hardButton = new Button(this, 50, 150, 0xff250e, 'hard', this.playGame);

        // CODIGOS DE COLORES BASICOS (saturados): https://encycolorpedia.es/
        // verde => 0x63ff4f        azul => 0x126bff
        // amarillo => 0xe2ff29     rosa => 0xff2cd7
        // rojo => 0xff250e         negro => 0x010101 (por ejemplo)
        // morado => 0xa14ad7       blanco => 0x#ffffff (por ejemplo)
    }



    // este metodo pide una escena porque this.scene no pilla la escena mainMenu en la que esta
    // creo que es porque se llama desde el boton entonces su this no es el de la escena
    // donde ha sido declarado el metodo pero idk.
    // scene.scene -> el primero es el scene que le pasas (el this) y el segundo es para llegar
    // al atributo escena de la propia escena. 
    // Metodo start: pide el nombre de la escena a la que pasar y se puede pasar un atributo mas
    // opcional de datos con el que pasar informacion extra, en este caso se pasa la dificultad
    playGame(mode, scene){

        // cambia de escena y le pasa la difficultad
        scene.scene.start("Jetpac", {datos: mode});

    }
}