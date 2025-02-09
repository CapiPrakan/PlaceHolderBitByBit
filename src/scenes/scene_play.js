import Palas from "/src/gameObjects/palas.js";
import Ball from "/src/gameObjects/ball.js";

class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePlay" });
    }

    create() {
        // Obtenemos las dimensiones del juego
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        // Separador
        this.add.image(this.width / 2, this.height / 2, "separador");

        // Jugadores
        this.left = new Palas(this, 30, this.height / 2, "izquierda");
        this.right = new Palas(this, this.width - 30, this.height / 2, "derecha");

        // Pelota
        this.ball = new Ball(
            this, 
            this.sys.game.config.width / 2, 
            this.sys.game.config.height / 2, 
            "ball", 
            this.sys.game.config.width, 
            this.sys.game.config.height
        );


        // Físicas
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.physics.add.collider(this.ball, this.left, this.hit, null, this)
        this.physics.add.collider(this.ball, this.right, this.hit, null, this)

        // Controles
        this.cursor = this.input.keyboard.createCursorKeys();

        // Pala derecha
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Pala izquierda
        this.cursor_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursor_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }

    update() {
        if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
            this.ball.setBall();
        }

        // Controles
        this.left.pala_movement(this.cursor_W, this.cursor_S, this.height);
        this.right.pala_movement(this.cursor_up, this.cursor_down,  this.height);
    }

    hit(ball, pala) {
        let pos_y = ball.y - pala.y;
        ball.hit(10 * pos_y);
    }
}

export default ScenePlay;