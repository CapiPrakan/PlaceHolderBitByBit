class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);

        this.width = this.scene.sys.game.config.width;
        this.height = this.scene.sys.game.config.height;

        this.setBall();
    }

    setBall() {
        this.setPosition(this.width / 2, this.height / 2);
        this.body.setVelocityY(0);
        let rand = Math.random() < 0.5 ? -1 : 1;
        this.body.setVelocityX(180 * rand);
    }

    hit(velocityY) {
        this.body.setVelocityY(velocityY);
    }
}

export default Ball;