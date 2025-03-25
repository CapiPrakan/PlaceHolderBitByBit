import Managers from "/src/scenes/managers";

import { PANTALLA_MANAGER } from "/src/data/scene_data.js";

// esta escena de momento solo lanza la escena de dialogo
class PantallaManager extends Managers {
    constructor() {
        super({ key: PANTALLA_MANAGER });

        this.pause = false;
    }

    create() {
    }

    exit() {
        this.scene.pause();
    }

    enter() {
        this.scene.resume();
    }
}

export default PantallaManager;
