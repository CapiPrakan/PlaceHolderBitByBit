// cargaremos las imagenes en el bootloader y luego llamaremos a la escena
class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader", active: true });
    }

    preload() {
        // cuando se completa la carga de todos los elementos, llamamos a la escena ScenePlay
        this.load.on("complete", () => {
            this.scene.start("ScenePlay");
        });
        
        // carga de imágenes
        this.load.image("ball", "/PlaceHolderBitByBit/docs/assets/img/ball.png");
        this.load.image("izquierda", "/PlaceHolderBitByBit/docs/assets/img/left_pallete.png");
        this.load.image("derecha", "/PlaceHolderBitByBit/docs/assets/img/right_pallete.png");
        this.load.image("separador", "/PlaceHolderBitByBit/docs/assets/img/separator.png");
    }
}

export default Bootloader;