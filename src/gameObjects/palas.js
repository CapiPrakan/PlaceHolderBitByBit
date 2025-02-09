class Palas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }
    
    pala_movement(cursor_up, cursor_down, height) {
        if (cursor_up.isDown && this.y > this.height / 2) {
            this.y -= 1;
        } else if (cursor_down.isDown && this.y < height - this.height / 2) {
            this.y += 1;
        }
    }
}

export default Palas;