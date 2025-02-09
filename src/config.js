import Bootloader from '/src/bootloader.js'; // Importamos el Bootloader
import ScenePlay from '/src/scenes/scene_play.js'; // Importamos la escena ScenePlay

// Configuración del juego
const config = {
    // Tamaño del canvas
    width: 640,
    height: 400,

    // Contenedor del canvas (donde queremos poner el juego en el html)
    parent: 'contenedor',

    // Físicas del juego
    physics: {
        default: 'arcade',
    },

    // Escenas del juego
    scene: [
        Bootloader,
        ScenePlay
    ],
}

// Creamos el juego con la configuración
new Phaser.Game(config);