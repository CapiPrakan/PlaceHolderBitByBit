import Phaser from "phaser";
import { DATA_INFO, PANTALLA_MANAGER } from "/src/data/scene_data.js";

class DataInfo extends Phaser.Scene {
    constructor() {
        super({ key: DATA_INFO });

        // PATHS
        this.ROOT = '/PlaceHolderBitByBit/';
        this.ASSETS_PATH = this.ROOT + 'assets/';

        this.JSON_PATH = this.ASSETS_PATH + 'json/';
        this.IMG_PATH = this.ASSETS_PATH + 'img/';
    }

    preload() {
        // ejecutar antes el comando node ./src/utils/generateFoldersJson.js para actualizar el archivo folders.json
        this.load.json("json_folders", this.JSON_PATH + "folders.json");
    }

    create() {
        this.crear_laoding_screen();
        this.get_number_assets();
        this.load_assets();
    }

    // crea la barra y caja de carga
    crear_laoding_screen() {
        const { width, height } = this.scale;
        
        // crear caja de fondo de la barra
        this.loading_box = this.add.graphics();
        this.loading_box.fillStyle(0x222222, 0.8);
        this.loading_box.fillRect(width / 2 - width / 4, height / 2 - 20, width / 2, 200);

        // crear barra de progreso (vacía al principio)
        this.loading_bar = this.add.graphics();

        // guardar posición base
        this.bar_x = width / 2 - width / 4 + 10;
        this.bar_y = height / 2 - 10;
        this.bar_width = width / 2 - 20;
        this.bar_height = 180;
    }

    // obtiene el nuemro de assets que tiene que cargar
    get_number_assets() {
        const json_folder = this.cache.json.get("json_folders");

        this.number_assets = this.get_number_assets_recursive(json_folder);
        this.loaded_assets = 0;
    }

    // obtiene el numero de assets de forma recursiva, apoya a get_number_assets
    get_number_assets_recursive(folder) {
        let number_assets = 0;

        folder.folders.forEach((subfolder) => {
            number_assets += this.get_number_assets_recursive(subfolder);
        });

        number_assets += folder.files.length;

        return number_assets;
    }

    // actualiza la barra de carga
    update_loading_bar() {
        this.loaded_assets++;
        const progress = this.loaded_assets / this.number_assets;

        this.loading_bar.clear();
        this.loading_bar.fillStyle(0xffffff, 1);
        this.loading_bar.fillRect(
            this.bar_x,
            this.bar_y,
            this.bar_width * progress,
            this.bar_height
        );

        if (progress === 1) {
            this.scene.start(PANTALLA_MANAGER);
        }
    }

    // carga los assets
    load_assets() {
        this.loaded_assets = 0;

        this.load.on("filecomplete", () => {
            this.update_loading_bar();
        });

        this.load_jsons();
        this.load_imgs();

        this.load.start();
    }

    load_jsons() {
        const jsons = ["data", "dialog", "pantallas", "saves"];
        jsons.forEach((name) => {
            this.load_json(name);
        });
    }

    load_json(name) {
        this.load.json("json_"+name, this.JSON_PATH + name+".json");
    }

    get_json_data() {
        return this.cache.json.get("json_data").Data;
    }

    get_json_dialog() {
        return this.cache.json.get("json_dialog").Dialog;
    }

    get_json_pantallas() {
        return this.cache.json.get("json_pantallas").Pantallas;
    }

    get_json_saves() {
        return this.cache.json.get("json_saves").Saves;
    }

    load_imgs() {
        const paths = ['backgrounds/'];
        const imgs = ['fin_demo', 'habitacion', 'salon']

        paths.forEach((path) => {
            imgs.forEach((name) => {
                this.laod_img_(name, path);
            });
        });
    }

    laod_img_(name, path) {
        this.load.image("img_"+name, this.IMG_PATH + path + name +".png");
    }
}

export default DataInfo;