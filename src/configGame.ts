import Phaser from "phaser";

let background: Phaser.GameObjects.Image;
let player: Phaser.Physics.Arcade.Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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
  for (let i = 1; i <= 8; i++) {
    // if (i !== 3 && i !== 4) {
    this.load.image(`p3_walk${i}`, `/assets/player/p3_walk${i}.png`);
    this.load.image(`p3_walkLeft${i}`, `/assets/player/p3_walkLeft${i}.png`);
    // }
  }
  // this.load.on("complete", () => {
  //   console.log("Image chargée !");
  // });
}

function create(this: Phaser.Scene): void {
  background = this.add.image(0, 0, "sky").setOrigin(0, 0);
  background.setScrollFactor(0);

  platforms = this.physics.add.staticGroup();
  platforms.create(35, 600, "grassHalfLeft").setScale(1).refreshBody();
  let j = 105;
  for (let i = 0; i < 10; i++) {
    platforms.create(j, 600, "grassHalfMid").setScale(1).refreshBody();
    j += 70;
  }
  platforms.create(765, 600, "grassHalfRight").setScale(1).refreshBody();

  let frames: { key: string }[] = [];
  for (let i = 1; i <= 6; i++) {
    if (i !== 3 && i !== 4) {
      frames.push({ key: `p3_walk${i}` });
    }
  }

  let framesToLeft: { key: string }[] = [];
  for (let i = 1; i <= 6; i++) {
    if (i !== 3 && i !== 4) {
      framesToLeft.push({ key: `p3_walkLeft${i}` });
    }
  }

  // JUMP
  let framesJump: { key: string }[] = [];
  for (let i = 2; i <= 8; i++) {
    if (i !== 5 && i !== 6) {
      framesJump.push({ key: `p3_walk${i}` });
    }
  }

  player = this.physics.add.sprite(40, 350, "p3_walk1");
  player.setBounce(0.2);
  player.setCollideWorldBounds(false);

  // Configuration de la collision entre player et platforms
  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: "right",
    frames: frames,
    frameRate: 10,
    //repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "p3_walk2" }],
    frameRate: 20,
  });

  this.anims.create({
    key: "left",
    frames: framesToLeft,
    frameRate: 10,
    // repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: framesJump,
    frameRate: 10,
    // repeat: -1,
  });
}

function update(this: Phaser.Scene): void {
  if (this.input.keyboard) {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.right.isDown) {
      player.setVelocityX(90);

      // Suivi camera du player
      const camera = this.cameras.main;
      if (player.x > camera.scrollX + 500) {
        const distance = player.x - camera.scrollX - 500;
        const speed = distance / 100;
        camera.setScroll(camera.scrollX + speed, 0);
      }
      player.anims.play("right", true);
    } else if (cursors.left.isDown) {
      player.setVelocityX(-90);
      player.x -= 0;

      const camera = this.cameras.main;
      if (player.x < camera.scrollX + 500 && player.x >= 0) {
        // console.log(player.x);
        const distance = camera.scrollX + 500 - player.x;
        const speed = distance / 100;
        camera.setScroll(camera.scrollX - speed, 0);
      }

      // Création d'un objet invisible pour bloquer le joueur à gauche (collision)
      const leftBounds: Phaser.GameObjects.Rectangle = this.add.rectangle(
        -50,
        600 / 2,
        100,
        600,
        0x000000,
        0
      );
      this.physics.add.existing(leftBounds);
      leftBounds.setOrigin(0.5);
      // Configuration de la collision entre player et leftBounds (objet invisible)
      this.physics.add.collider(player, leftBounds);

      player.anims.play("left", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn", true);
    }
  }

  if (player.body && cursors.up.isDown && player.body.blocked.down) {
    // console.log("test");
    player.setVelocityY(1200);
    player.anims.play("up", true);
  }
}

export default game;
