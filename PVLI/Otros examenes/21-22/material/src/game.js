import Jetpac from "./jetpac.js"
import MainMenu from "./mainMenu.js"


window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ MainMenu, Jetpac ],
        physics: {
            default: 'arcade', 
            arcade: {
              gravity: { y : 100 },
              debug: true
            },
            checkCollision: {
                up: true,
                down: false,
                left: false,
                right: false
            }
        }
    };

    new Phaser.Game(config);
};

