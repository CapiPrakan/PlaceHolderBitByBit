
import Managers from "/src/scenes/managers";
import PantallaPersoanjes from "/src/pantallas/game_objects/pantalla_personajes";

import { PANTALLA_MANAGER , DATA_INFO } from "/src/data/scene_data.js";

// esta escena de momento solo lanza la escena de dialogo
class PantallaManager extends Managers {
    constructor() {
        super({ key: PANTALLA_MANAGER });

        this.offset_x = 0;
        this.offset_y = 0;

        this.can_move = false;
        this.animation_finnished = false;

        this.interactuables_animations = {};
        this.npcs_array = [];
    }

    create() {
        this.data_info_scene = this.scene.get(DATA_INFO)

        this.data = this.data_info_scene.get_data_json();
        this.data_json = this.data.Json;

        this.pantallas_data = this.data_info_scene.get_json(this.data_json.Pantallas);
        this.saves_data = this.data_info_scene.get_json(this.data_json.Saves);

        this.pantalla_data = this.pantallas_data[this.saves_data.Pantalla];

        const { width, height } = this.sys.game.canvas;

        this._load_background(width, height);
        this._load_npcs();
        this._load_prota();
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
        let img = this.data_info_scene.get_img(PANTALLA_MANAGER, this.pantalla_data.background)
        this.background = this.add.image(width / 2, height / 2, img);
    }

    _change_background() {
        let img = this.data_info_scene.get_img(PANTALLA_MANAGER, this.pantalla_data.background)
        this.background.setTexture(img);
    }

    _load_npcs() {
        this.npcs_array = [];
        let pantalla_data_npcs = this.pantalla_data.npcs;
        
        Object.keys(pantalla_data_npcs).forEach((key) => {
            this.npcs_array.push(this._load_personaje(pantalla_data_npcs[key]));
        });
    }

    _load_prota() {
        this._load_personaje(this.pantalla_data.prota)
    }

    _load_personaje(datos) {
        let nombre = datos.nombre;
        let pose = datos.pose;
        let x = datos.pos_x;
        let y = datos.pos_y;
        let size = datos.size;
        let delay = datos.delay;
        let animation = datos.animation;
        let on_click = datos.on_click;

        let nombre_img = this.data_info_scene.get_img(PANTALLA_MANAGER, nombre + "_" + pose);
        return new PantallaPersoanjes(this, x, y, nombre_img, size, delay, animation, on_click, nombre);
    }
}

export default PantallaManager;
