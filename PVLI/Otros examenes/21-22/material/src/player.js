

export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        // matter -> chungo y la api es un mierdon
        // arcade -> mas facil pero es un mierdon

        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        // en este caso spritesheet (esta como 'jett' ahra pero paso de mirarlo,
        // deberia ser key)
        this.jett = this.scene.physics.add.sprite(x, y, 'jett');

        //
        this.speed = 140;

        // ---------------------------- INPUT ---------------------------------

        // registra la tecla w en this.w
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');

        // añade a la escena (jetpac.js) el objeto entero
        this.scene.add.existing(this);
    }

    preUpdate(t, dt) {
        // el preupdate del super creo CREO que solo hace flata si la clase fuera tipo
        // Phaser.GameObjects.Sprite, pero al ser container parece que no hace falta...?
		//super.preUpdate(t, dt);

        // si pulsa la W
        if(this.w.isDown){
            this.propulsar();
        }
        else if (this.a.isDown){
            this.move(-this.speed);
        }
        else if(this.d.isDown){
            this.move(this.speed);
        }

        else if(this.a.isUp && this.d.isUp){
            this.jett.body.setVelocityX(0);
        }


    }

    propulsar(){

        // si la velocidad en la y es mayor que -80 sigue propulsando
        if(this.jett.body.velocity.y > -80 && this.jett.y >= 20){

            // settea la velocidad del cuerpo de jett (el sprite del personaje)
            this.jett.body.setVelocityY(this.jett.body.velocity.y - 10);

            // animacion
            this.jett.play('jumpingJett');
        }
        else if(this.jett.y <= 15){

            // placeholder
            this.jett.y = 15;

        }

        // this.jett coge el objeto (el sprite), mientras que .body llega a la parte
        // que controla las fisicas. .velocity llega a la velocidad que tiene el
        // body y .y es entendible

        // seVelocityY es un atajo porque creo que se podria hacer un -=

        
    }

    move(dir){

        // settea el movimiento
        this.jett.body.setVelocityX(dir);
        
        // toroidal 
        if(this.jett.x <= 0){
            this.jett.x = 256;
        }
        else if(this.jett.x >= 256){
            this.jett.x = 0;
        }
        


    }


    
    // metodo auxiliar que devuelve el SPRITE DE ARCADE para poder hacer uso
    // de, por ejemplo, el body fuera de este container (para colisiones de
    // momento)
    getSprite(){
        return this.jett;
    }

    
}