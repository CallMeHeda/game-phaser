import Phaser from "phaser";
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
var game = new Phaser.Game(config);
function preload() {
    this.load.image("sky", "./src/assets/images/sky.png");
    //   this.load.spritesheet("dude", "img/dudes.png", {
    //     frameWidth: 22,
    //     frameHeight: 28,
    //   });
    this.load.on("complete", function () {
        console.log("Image chargée !");
    });
}
function create() {
    this.add.image(400, 300, "sky");
    //   let player = this.physics.add.sprite(100, 450, "dude");
    //   player.setBounce(0.2);
    //   player.setCollideWorldBounds(true);
    //   this.anims.create({
    //     key: "left",
    //     frames: this.anims.generateFrameNumbers("dude", { start: 24, end: 27 }),
    //     frameRate: 10,
    //     repeat: -1,
    //   });
    //   this.anims.create({
    //     key: "turn",
    //     frames: [{ key: "dude", frame: 4 }],
    //     frameRate: 20,
    //   });
    //   this.anims.create({
    //     key: "right",
    //     frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1,
    //   });
}
function update() { }
export default game;
