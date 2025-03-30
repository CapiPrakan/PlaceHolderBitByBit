import Phaser from "phaser";

// esta escena de momento solo lanza la escena de dialogo
class Managers extends Phaser.Scene {
    constructor(scene) {
        super(scene);

        this.isPause = false;
    }

    // se ejecuta al salir de la escena
    exit() {}

    // se ejecuta al entrar en la escena
    enter() {}

    // se ejecuta al actualizar la escena
    update() { if (this.isPause) { return; } }

    // se ejecuta al pausar la escena
    pause() { this.isPause = true; }

    // se ejecuta al despausar la escena
    unpause() { this.isPause = false; }

    // se ejecuta al enviar una señal
    sendSignal(signal_data) {}

    // se ejecuta al recibir una señal
    onSignal(signal_data) {}
}

export default Managers;
