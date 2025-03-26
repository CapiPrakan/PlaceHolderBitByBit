
import Managers from "/src/scenes/managers";

import { PANTALLA_MANAGER, DATA_INFO } from "/src/data/scene_data.js";

// esta escena de momento solo lanza la escena de dialogo
class PantallaManager extends Managers {
    constructor() {
        super({ key: PANTALLA_MANAGER });

        this.offset_x = 0;
        this.offset_y = 0;

        this.can_move = false;
        this.animation_finnished = false;

        this.interactuables_animations = {};
    }

    create() {
        const data_info_scene = this.scene.get(DATA_INFO)

        this.pantallas_data = data_info_scene.get_json_pantallas();
        this.saves_data = data_info_scene.get_json_saves();

        this.pantalla_data = this.pantallas_data[this.saves_data.Pantalla];

        const { width, height } = this.sys.game.canvas;

        this._load_background(width, height);
    }

    exit() {
        this.pause();
    }

    enter() {
        this.unpause();
    }

    update() {
        if (this.isPause) {
            return;
        }
    }

    pause(){
        super.pause();
    }

    _load_background(width, height) {
        this.background = this.add.image(width / 2, height / 2, "img_" + this.pantalla_data.background);
    }

    _change_background() {
        this.background.setTexture("img_" + this.pantalla_data.background);
    }
}

export default PantallaManager;
