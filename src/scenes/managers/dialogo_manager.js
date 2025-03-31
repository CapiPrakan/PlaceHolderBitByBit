import Managers from "/src/scenes/managers";
import PantallaPersoanjes from "/src/pantallas/game_objects/pantalla_personajes";

import { DIALOGO_MANAGER , DATA_INFO, SCENE_MANAGER } from "/src/data/scene_data.js";

// esta escena de momento solo lanza la escena de dialogo
class DialogoManager extends Managers {
    constructor() {
        super({ key: DIALOGO_MANAGER });
    }

    create() {}

    _load_dialogo(dialogo) {}

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

    startting_animation() {
        this.pause();
    }

    finnish_animation() {
        this.unpause();
    }

    signal_click(on_click) {
        if (on_click.scene == 'dialogo') {
            this._load_dialogo(on_click.name);
        } else {
            this.scene.get(SCENE_MANAGER).signal_click(on_click);
        }
    }
}

export default DialogoManager;
