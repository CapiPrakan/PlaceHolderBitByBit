import Phaser from 'phaser';

class PantallaGameObjects extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, nombre_img, size_x, size_y, delay, animationm, on_click, nombre) {
        super(scene, x, y, nombre_img);
        this._reset_varaibles();

        if (on_click) {
            this.setInteractive();
            this._set_events();
            this.on_click = on_click;
        }

        this.setScale(size_x, size_y);

        if (animationm) {
            // TODO: ADD ANIMAITON
        }

        this.nombre = nombre;

        setTimeout(() => {
            this._add_sprite(animationm);
        }, delay);
    }

    _reset_varaibles() {
        this.isPause = false;
        this.nombre = "";
        this.on_click = null;
        this.mouse_over = false;
    }

    _add_sprite(animation) {
        this.scene.add.existing(this);

        if (animation) {
            // TODO: ADD ANIMAITON
        } else {
            // TODO: INFORMAR QUE NO HAY ANIMACION
        }
    }

    // se ejecuta al salir de la escena
    exit() {}

    // se ejecuta al entrar en la escena
    enter() {}

    // se ejecuta al actualizar la escena
    update() {}

    // se ejecuta al pausar la escena
    pause() {
        this.isPause = true;
    }

    // se ejecuta al despausar la escena
    unpause() {
        this.isPause = false;
    }

    _start_animation() {}

    _stop_animation() {}

    _set_events() {
        this.on('pointerenter', this._mouse_enter, this);
        this.on('pointerover', this._mouse_over, this);
        this.on('pointerout', this._mouse_out, this);
        this.on('pointerupoutside', this._mouse_out, this);
        this.on('pointerdown', this._mouse_down, this);
        this.on('pointerup', this._mouse_up, this);
        this.on('pointermove', this._mouse_move, this);

        this.on('destroy', this.before_destroy, this);
    }

    _mouse_enter() {}

    _mouse_over() {
        this.mouse_over = true;
    }

    _mouse_out() {
        this.mouse_over = false;
    }

    _mouse_down() {}

    _mouse_up() {}

    _mouse_move() {}

    before_destroy() {}
}

export default PantallaGameObjects;