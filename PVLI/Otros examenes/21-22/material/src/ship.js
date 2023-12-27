

export default class Spaceship extends Phaser.GameObjects.Container {
    constructor(scene, x, y, necessaryFuelini){
        super(scene, x, y)

        // crea un sprite normal SIN FISICAS DE ARCADE para que no caiga
        // (se podria hacer como el fuel pero asi pruebo a hacer una
        // hitbox normal xd)
        this.myship2 = this.scene.add.sprite(x, y, 'shipSprite')
        this.myship2.depth = -2; // settea la prfundidad

        // crea una hitbox con un rectangulo y lo ajusto a las dimensiones de la nave
        // no son exactamente las de la imagen pero estan ajustadas a ojo
        this.hitbox = this.scene.add.rectangle(x, y, 16, 50);
        
        // le añade fisicas a la hitbox para que pueda colisionar, lo primero,
        // es el objeto al que le añades fisicas y lo segundo es si es estatico o no;
        // que sea estatico o no no se que hace AUN
        this.scene.physics.add.existing(this.hitbox, true);

        // crea el contador de combustible necesario para ganar
        this.necessaryFuel = necessaryFuelini;

        // contador del fuel actual
        this.currentFuel = 0;
    }


    // añade combustible a la nave
    addFuel(){
        console.log(this.currentFuel);
        //
        this.currentFuel += 1;

        console.log(this.currentFuel);
    }


    // devuelve si la nave ha sido completamente cargada o no
    isComplete(){
        return this.currentFuel == this.necessaryFuel;
    }

    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.myship;
    }

    // devuelve la hitbox (el rectangulo)
    getHitbox(){
        return this.hitbox;
    }


}