//
import Player from "./player.js"

//
export default class Jetpac extends Phaser.Scene {

    // constructora de la clase
    constructor(){

        // como se va a llamar la escena en el config del game 
        super({ key: 'Jetpac'})
    }


    /**
	 * función init, recibimos la información desde la escena que la llama
	 */
	init(data){
        this.diff = data;
		console.log(data)
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
        // carga del sprite del jugador => no hace falta pero aqui esta de chill
        this.load.image('jetPacSprite', './assets/sprites/jetpac.png');

        // carga del spritesheet del personaje principal, con el id para el codigo, 
        // la raiz y las dimensiones de cada frame, para poder dividirlo en los que sea
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
    



        // ---------------------------- PLAYER ---------------------------------

        // creacion de las animaciones del player. Se ejecutan en el propio objeto Player pero 
        // no hace falta pasarlas por la constructora, son globales y 
        this.anims.create({
            key: 'jumpingJett',
            frames: this.anims.generateFrameNumbers('jett', { start: 0, end: 5 }),
            frameRate: 4, // Velocidad de la animación
            repeat: 0    // Animación en bucle
        });

        this.anims.create({
            key: 'floatingJett',
            frames: this.anims.generateFrameNumbers('jett', { start: 0, end: 5 }),
            frameRate: 4, // Velocidad de la animación
            repeat: 0    // Animación en bucle
        });
        

        // crea un objet de tipo player (especificaciones en el player)
        this.playerObj = new Player(this, 20, 20, 'jett');

        // animacion (WIP)
        // this.play('jumpingJett');





        // ---------------------------- COLISIONES -----------------------------

        // activa las colisiones entre los dos objetos marcados, en este caso el player
        // (playerObj) y la capa del suelo (floorLayer)
        // !! en el primer parametro esta .getSprite() porque, al ser player una clase
        // de tipo container, cuando le llamas no es capaz de llegar al body, que es 
        // lo que se encarga de mirar fisicas y colisones, asi que le paso directamente
        // el arcade sprite (this.scene.physics.add.sprite() para que pueda llegar al body.
        // Si se hiciera al player directamente en esta escena y no en una clase a aparte 
        // no haria falta este detalle (!! .getSprite() es un metodo que he hecho yo auxiliar) )
        this.physics.add.collider(this.playerObj.getSprite(), this.floorLayer);


        // en la propia capa, decide que bloques tienen collider y cuales no
        // se puede hacer por exclusion con layer.setCollisionByExclusion([93, 94, 95, 96], true);
        //      siendo [93, .... 96] los ids de los bloques que excluir y true que activa las colisiones
        // tambien se pueden hacer por propiedades pero no acabo de entender el metodo:
        //      layer.setCollisionByProperty({ colisiona: true });
        this.floorLayer.setCollisionBetween(1,4);
        
        

        // ------------------------------- DIFICULTAD -------------------------------

        if(this.diff.datos == 'easy'){
            console.log('easy');

            // ajustes de cooldown de meteoritos y polvos
        }
        else if(this.diff.datos == 'mid'){
            console.log('mid');

            // ajustes de cooldown de meteoritos y polvos

        }
        else if(this.diff.datos == 'hard'){
            console.log('hard');

            // ajustes de cooldown de meteoritos y polvos

        }

    }


    update(time, dt){

	}

}