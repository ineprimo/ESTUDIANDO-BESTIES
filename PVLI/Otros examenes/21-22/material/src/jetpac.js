//
import Player from "./player.js"
import Character from "./character.js"

//
export default class Jetpac extends Phaser.Scene {

    // constructora de la clase
    constructor(){

        // como se va a llamar la escena en el config del game 
        super({ key: 'Jetpac'})
    }


    // load de las texturas
    preload(){

        // ------------------------------ CARGA DEL TILE MAP ---------------------------
        // this -> escena
        // load -> carga (????)
        // tilemapTiledJSON() -> metodo de Phaser 3.5+ que carga un tilemap en formato
        //      json con un nombre especifico -> en este caso 'map' es el nombre del 
        //      del archivo 'room.json'
        this.load.tilemapTiledJSON('map', './assets/map/tilemap.json');

        // carga el archivo con los patrones para el mapa (solo lo visual)
        this.load.image('mapSprites', './assets/sprites/tileset.png');


        // ------------------------------ CARGA DE SPRITES -------------------------------
        // carga del sprite del jugador
        this.load.image('jetPacSprite', './assets/sprites/jetpac.png');

        // En el preload
        this.load.spritesheet('jett', './assets/sprites/jetpac.png', { frameWidth: 17, frameHeight: 24 });

    }


    //
    create(){

        

        // ----------------------------- CREACION DEL TILE MAP -----------------------------
        // crea un tilemap con la key 'map' (json) y con las dimensiones 64x64
        this.map = this.make.tilemap({ 
            key: 'map', 
            tileWidth: 64, 
            tileHeight: 64 
        });

        // añade despues (por que hace esto asi phaser tu esta bastante feo idk)
        // primero el nombre de la imagen EN EL TILEMAP DEL JSON y el segundo el
        // de AQUI (para encontrar el primer key hay que irse al json, a tilset 
        // y mirar "name": "....")
        const tileset = this.map.addTilesetImage('ground_ts', 'mapSprites');

        // para crear las capas y que finalmente se vea el mapa hace falta crearlas 
        // individualmente. Cada capa que se cree se visualiza en el canvas.
        // para crear la layer hace falta pasarle al metodo createLayer del map
        // el nombre de la capa en el tiled ("name" : "ground", dentro de cada capa), 
        // el tileset que hemos hecho hace nada (tileset), y las coordenadas en las que
        // queremos poner el tileset
        this.floorLayer = this.map.createLayer('ground', tileset, 0, 0);
        this.floorLayer.setCollision(2);

        this.player = this.physics.add.sprite(50,20, 'jett');
        this.playerObj = new Player(this, 20, 20, 'jett');

        this.play = new Character(this, 70, 20, 'jett');

        console.log(this.player);
        console.log(this.playerObj);
        console.log(this.play);

        // colisiones especificas del player con la layer (tilemap)
        this.physics.add.collider(this.playerObj.getSprite(), this.floorLayer);
        this.physics.add.collider(this.player, this.floorLayer);
        this.physics.add.collider(this.play, this.floorLayer);
        this.floorLayer.setCollisionBetween(1,4);

        // ---------------------------- PLAYER ---------------------------------

        // Como 'mummy' es un spritesheet, puede identificar los frames
        // this es Scene
        this.jettAnim = this.anims.create({
            key: 'jumpingJett',
            frames: this.anims.generateFrameNumbers('jett', { start: 0, end: 2 }),
            frameRate: 2, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });


        

        

        //console.log(playerObj);
        // this.play('standing_mummy');

        // ---------------------------- INPUT ---------------------------------

        // registra la tecla w en this.w
        this.w = this.input.keyboard.addKey('W');


        // ---------------------------- COLISIONES -----------------------------

        //
        
        

    }


    update(){

        if(this.w.isDown){
            this.playerObj.propulsar();
        }
    }

}