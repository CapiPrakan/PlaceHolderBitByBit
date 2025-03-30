import Managers from "/src/scenes/managers";

import { SCENE_MANAGER } from "/src/data/scene_data.js";

// esta escena de momento solo lanza la escena de dialogo
class PantallaManager extends Managers {
    constructor() {
        super({ key: SCENE_MANAGER });
    }

    create() {}

    exit() {
        this.pause();
    }

    enter() {
        this.unpause();
    }

    update() {
        super.update();
    }

    pause(){
        super.pause();
    }

    unpause(){
        super.unpause();
    }
}

export default PantallaManager;
