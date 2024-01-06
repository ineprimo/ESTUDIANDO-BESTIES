//
import Player from "./player.js"
import Fuel from "./fuel.js"
import Spaceship from "./ship.js";
import Meteor from "./meteor.js";

//
export default class Jetpac extends Phaser.Scene {

    // constructora de la clase
    constructor(){

        // como se va a llamar la escena en el config del game 
        super({ key: 'Jetpac'})
    }


    // funcion init para recibir la informacion pasada al cambiar de escena
	init(data){

        // settea la dificultad
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




        // -------------------------------- CARGA DEL AUDIO -----------------------------
        this.load.audio('explosion', './assets/sounds/explosion.wav');
        this.load.audio('drop', './assets/sounds/drop.wav');
        this.load.audio('pick', './assets/sounds/pick.wav');
        this.load.audio('lose', './assets/sounds/lose.wav');
        this.load.audio('win', './assets/sounds/win.wav');


        
        



        // ------------------------------ CARGA DE SPRITES -------------------------------
        // carga del sprite del jugador => no hace falta pero aqui esta de chill
        this.load.image('jetPacSprite', './assets/sprites/jetpac.png');

        // carga del spritesheet del personaje principal, con el id para el codigo, 
        // la raiz y las dimensiones de cada frame, para poder dividirlo en los que sea
        this.load.spritesheet('jett', './assets/sprites/jetpac.png', { frameWidth: 17, frameHeight: 24 });

        // carga del sprite del fuel
        this.load.image('fuelSprite', './assets/sprites/fuel.png');

        // carga del sprite de la nave
        this.load.image('shipSprite', './assets/sprites/spaceship.png');

        // carga del meteorito
        this.load.spritesheet('meteorSprite', './assets/sprites/meteor.png', { frameWidth: 16, frameHeight: 14 });

    }





    //
    create(){



        // ----------------------------- VARIABLES AUXILIARES ----------------------------
        // contador del fuel, cuando se coge uno de fuel se añade al contador, cuando se llega
        // a la nave se le pone el fuel
        this.fuelCount = 0;

        // contador para la generacion de meteoritos y fuels
        this.meteorCooldown = 0;


        // ----------------------------- AUDIO --------------------------------------
        this.loseSound = this.sound.add('lose');
        this.winSound = this.sound.add('win');
        this.explostionSound = this.sound.add('explosion');
        this.pickSound = this.sound.add('pick');
        this.dropSound = this.sound.add('drop');


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
        

        // crea un objeto de tipo player (especificaciones en el player)
        this.playerObj = new Player(this, 20, 20, 'jett');









        // ------------------------------- DIFICULTAD -------------------------------

        if(this.diff.datos == 'easy'){
            console.log('easy');

            // ajustes de cooldown de meteoritos y polvos
            // 2 segundos = 2000 milisegundos
            this.meteorCooldown = 2000;

            this.totalFuel = 2

        }
        else if(this.diff.datos == 'mid'){
            console.log('mid');

            // ajustes de cooldown de meteoritos y polvos
            // 1 segundo = 1000 milisegundos
            this.meteorCooldown = 1000;

            this.totalFuel = 3
        }
        else if(this.diff.datos == 'hard'){
            console.log('hard');

            // ajustes de cooldown de meteoritos y polvos
            // 0.5 segundos = 500 milisegundos
            this.meteorCooldown = 500;

            this.totalFuel = 5

        }

        // creacion de objetos placeholders para probarlos 
        this.generateFuel()

        this.ship = new Spaceship(this, 200, 159, this.totalFuel);

        //this.meteor1 = new Meteor(this, 200, 50);

        // array de meteoritos

        /*
        this.METEORS = [];

        this.METEORS.push()

        console.log(this.METEORS);
*/
        

        // ---------------------------------- TIMER -----------------------------------
        // se crea un timer con un delay EN MILISEGUNDOS (1000ms = 1s), un callback al que
        // llamar cuando se acabe el timer, no se lo que es callbackScope tbh y si se repite el timer
        // para eliminar el timer se puede usar el metodo this.meteorTimer.removeEvent(this.meteorTimer)
        // (no lo he probado pero deberia ser asi xd)
        this.meteorTimer = this.time.addEvent( {
            delay: this.meteorCooldown, 
            callback: this.generateMeteor,
            callbackScope: this,
            loop: true
        });




        // ---------------------------- CREACION DE COLISIONES -----------------------------

        // activa las colisiones entre los dos objetos marcados, en este caso el player
        // (playerObj) y la capa del suelo (floorLayer)
        // !! en el primer parametro esta .getSprite() porque, al ser player una clase
        // de tipo container, cuando le llamas no es capaz de llegar al body, que es 
        // lo que se encarga de mirar fisicas y colisones, asi que le paso directamente
        // el arcade sprite (this.scene.physics.add.sprite() para que pueda llegar al body.
        // Si se hiciera al player directamente en esta escena y no en una clase a aparte 
        // no haria falta este detalle (!! .getSprite() es un metodo que he hecho yo auxiliar) )
        this.physics.add.collider(this.playerObj.getSprite(), this.floorLayer);

        // colisiones con el fuel en el propio generador de fuel

        // en la propia capa, decide que bloques tienen collider y cuales no
        // se puede hacer por exclusion con layer.setCollisionByExclusion([93, 94, 95, 96], true);
        //      siendo [93, .... 96] los ids de los bloques que excluir y true que activa las colisiones
        // tambien se pueden hacer por propiedades pero no acabo de entender el metodo:
        //      layer.setCollisionByProperty({ colisiona: true });
        this.floorLayer.setCollisionBetween(1,4);






        // ------------------------------------ COLISIONES ---------------------------------------
        // colisiones entre el fuel y el player, this.fuel1 deberia ser un grupo de colisiones
        // esta en el generador de fuel ....
        // (placeholder)
        // AHORA ES UN OVERLAP QUE QUEDA MAS BONITOOOOOOOOOOOOOOOOO
        // (para hacer colisiones es el mismo metodo pero en vez de overlap pones collider)
        

        // overlap con la hitbox de la nave
        this.physics.add.overlap(this.playerObj.getSprite(), this.ship.getHitbox(),() =>{

            // si tiene combustible
            if(this.fuelCount > 0){

                // añade fuel al contador de la nave
                this.ship.addFuel();

                //
                this.dropSound.play();

                // resetea el contador de fuel que tiene el jugador
                this.fuelCount = 0;

                // crea un nuevo fuel
                this.generateFuel()
            }
        });

        
    }


    update(time, dt){


        this.manageCooldown();

        // si la nave tiene todo el combustible gana el jugador
        if(this.ship.isComplete()){
            console.log("WIN");

            this.endGame('WIN', this)
        }

	}

    // ----------------------------------- METODOS PRINCIPALES --------------------------------

    generateMeteor(){

        let posX = Phaser.Math.Between(0, this.sys.game.canvas.width)

        this.meteor1 = new Meteor(this, posX, 0);

        // no es la mejor manera pero funciona, lo que querria hacer era un grupo de meteoritos
        // y que el player colisionara con el grupo, pero al ser el meteorito de tipo container
        // no se como hacerle llegar el arcade sprite al overlap :(   )

        // overlap con la hitbox del meteorito
        this.physics.add.overlap(this.playerObj.getSprite(), this.meteor1.getSprite(),() =>{

            console.log('LOSE');

            this.endGame('LOSE', this)
        });

        this.meteor1.dead = false;


        // overlap con la hitbox del meteorito
        this.physics.add.collider(this.floorLayer, this.meteor1.getSprite(),() =>{

            console.log(this.meteor1 + " to collide " + this.meteor1.dead);

            this.meteor1.dead = true;

            console.log(this.meteor1 + " collided " + this.meteor1.dead);

            this.explostionSound.play();
        });

    }

    generateFuel(){
        this.fuel1 = new Fuel(this, 50, 100);

         // colisiones con el fuel y el suelo
         this.physics.add.collider(this.fuel1.getSprite(), this.floorLayer);

         this.physics.add.overlap(this.playerObj.getSprite(), this.fuel1.getSprite(),() =>{

            // llama al metodo dentro del propio fuel que se encarga de destruir el objeto y de añadir
            // al contado de fuel que lo tiene
            this.fuel1.getFuel();

            this.pickSound.play();

            // añade al contador de fuel
            this.addFuel();

        });

    }


    manageCooldown(){

        // usar un timer que no se como usarlos



    }




    // -------------------------------------- METODOS AUXILIARES -------------------------------

    // añade al contador de fuel 1 de fuel, que es lo que se puede coger en principio
    addFuel(){

        this.fuelCount += 1;
    }

    // carga la nave, que va a tener un contado propio para saber si esta cargada del todo
    // en principio le resto uno al contador porque estoy prbando, se vera en el futuro
    chargeSpaceship(){
        this.fuelCount -= 1;
    }


    // ----------------------------------------- CAMBIAR DE ESCENA -----------------------------

    endGame(win, scene){

        if(win == 'LOSE'){

            scene.loseSound.play();
        }
        else if(win == 'WIN'){

            scene.winSound.play();
        }

        // cambia de escena y le pasa la difficultad
        scene.scene.start("MainMenu", {datos: win});

    }

}