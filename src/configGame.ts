import Phaser from "phaser";

let player: Phaser.Physics.Arcade.Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 250 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const game = new Phaser.Game(config);

function preload(this: Phaser.Scene): void {
  // BACKGROUND
  this.load.image("sky", "/assets/sky.png");
  // GRASS
  this.load.image("grassHalfLeft", "/assets/grassHalfLeft.png");
  this.load.image("grassHalfMid", "/assets/grassHalfMid.png");
  this.load.image("grassHalfRight", "/assets/grassHalfRight.png");
  // PLAYER
  for (let i = 1; i <= 7; i++) {
    if (i !== 3 && i !== 4) {
      this.load.image(`p3_walk0${i}`, `/assets/player/p3_walk0${i}.png`);
    }
  }
  // this.load.on("complete", () => {
  //   console.log("Image chargée !");
  // });
}

function create(this: Phaser.Scene): void {
  this.add.image(400, 300, "sky");
  platforms = this.physics.add.staticGroup();
  platforms.create(50, 600, "grassHalfLeft").setScale(1).refreshBody();
  platforms.create(100, 600, "grassHalfMid").setScale(1).refreshBody();
  platforms.create(150, 600, "grassHalfMid").setScale(1).refreshBody();
  platforms.create(200, 600, "grassHalfMid").setScale(1).refreshBody();
  platforms.create(250, 600, "grassHalfRight").setScale(1).refreshBody();

  let frames: { key: string }[] = [];
  for (let i = 1; i <= 7; i++) {
    if (i !== 3 && i !== 4) {
      frames.push({ key: `p3_walk0${i}` });
    }
  }

  // let framesToLeft: { key: string }[] = [];
  // for (let i = 7; i >= 5; i--) {
  //   framesToLeft.push({ key: `p3_walk0${i}` });
  // }

  player = this.physics.add.sprite(10, 350, "p3_walk02");
  // player.setCrop(0, 0, player.width, player.height - 5);
  // console.log(player.width + " - " + player.height);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: "right",
    frames: frames,
    frameRate: 10,
    // repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "p3_walk02" }],
    frameRate: 20,
  });

  // this.anims.create({
  //   key: "left",
  //   frames: framesToLeft,
  //   frameRate: 10,
  //   repeat: -1,
  // });

  // this.anims.create({
  //   key: "up",
  //   frames: this.anims.generateFrameNumbers("p3_walk", { start: 50, end: 53 }),
  //   frameRate: 10,
  //   repeat: -1,
  // });
}

function update(this: Phaser.Scene): void {
  let cursors = this.input.keyboard.createCursorKeys();
  if (cursors.right.isDown) {
    player.setVelocityX(50);
    player.anims.play("right", true);
  } else if (cursors.left.isDown) {
    player.setVelocityX(-50);
    // player.setScale(-1, 1);
    player.anims.play("left", true);
    // if (player.x <= 0) {
    //   player.setVelocityX(0);
    //   player.x = 0;
    // }
  } else {
    player.setVelocityX(0);
    player.anims.play("turn", true);
  }

  // if (cursors.up.isDown && player.body.blocked.down) {
  //   player.setVelocityY(1200);
  //   player.anims.play("up", true);
  // }
}

export default game;
