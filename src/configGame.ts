import Phaser from "phaser";

// let background: Phaser.GameObjects.Image;
let player: Phaser.Physics.Arcade.Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let rightCollideBounds: Phaser.GameObjects.Rectangle;
let leftCollideBounds: Phaser.GameObjects.Rectangle;

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
  for (let i = 1; i <= 11; i++) {
    this.load.image(`p3_walk${i}`, `/assets/player/p3_walk${i}.png`);
  }
  // LOAD PLAYER JUMP IMAGE
  this.load.image("p3_jump", "/assets/player/p3_jump.png");
  // this.load.on("complete", () => {
  //   console.log("Image chargée !");
  // });
}

function create(this: Phaser.Scene): void {
  this.physics.world.gravity.y = 800;
  this.add.image(0, 0, "sky").setOrigin(0, 0).setScrollFactor(0);

  // PLAYER
  player = this.physics.add.sprite(40, 250, "p3_walk2");
  player.setCollideWorldBounds(false);

  // PLATFORMES
  platforms = this.physics.add.staticGroup();
  // platforms.create(35, 600, "grassHalfLeft").setScale(1).refreshBody();

  let j = 0;
  while (j >= 0 && j <= 700 && player.x >= 40) {
    addPlatform(); // Ajouter une nouvelle image de plateforms
    j += 50;
  }

  // Configuration de la collision entre player et platforms
  this.physics.add.collider(player, platforms);

  let frames: { key: string }[] = [];
  for (let i = 1; i <= 6; i++) {
    if (i !== 3 && i !== 4) {
      frames.push({ key: `p3_walk${i}` });
    }
  }

  this.anims.create({
    key: "right",
    frames: frames,
    frameRate: 10,
    // repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: [{ key: "p3_jump" }],
    frameRate: 5,
  });
}

function update(this: Phaser.Scene): void {
  let cameraStop = false;

  if (this.input.keyboard) {
    cursors = this.input.keyboard.createCursorKeys();
    const camera = this.cameras.main;
    const rightBoundX = rightCollideBounds.getRightCenter().x;
    const leftBoundX = leftCollideBounds.getLeftCenter().x;

    if (player.body && cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-500);
      player.anims.play("up", true);
    } else if (cursors.right.isDown && !cameraStop) {
      player.setVelocityX(90);
      player.flipX = false;
      // Suivi camera du player (RIGHT)
      if (player.x > camera.scrollX + 500 && player.x <= 1000) {
        const distance = player.x - camera.scrollX - 610;
        const speed = distance / 100;
        camera.setScroll(camera.scrollX + speed, 0);
      }
      // COLLISION DROITE
      rightCollideBounds = this.add.rectangle(1040, 0, 1, 600);
      this.physics.add.existing(rightCollideBounds);
      this.physics.add.collider(player, rightCollideBounds, () => {
        cameraStop = true;
      });

      if (rightBoundX && camera.scrollX > rightBoundX) {
        cameraStop = true;
        player.setVelocityX(0);
      }

      if (cameraStop && rightBoundX) {
        camera.setScroll(rightBoundX - camera.width / 2);
      }

      player.anims.play("right", true);
    } else if (cursors.left.isDown && !cameraStop) {
      player.setVelocityX(-90);

      // !!! SUIVI CAMERA GAUCHE !!!
      if (player.x < camera.scrollX + 500 && player.x >= 0) {
        const distance = camera.scrollX + 50 - player.x;
        const speed = distance / 100;
        camera.setScroll(camera.scrollX - speed, 0);
      }
      // Création d'un objet invisible pour bloquer le joueur à gauche (collision)
      leftCollideBounds = this.add.rectangle(35, 0, 1, 600);
      this.physics.add.existing(leftCollideBounds);
      // Configuration de la collision entre player et leftBounds (objet invisible)
      this.physics.add.collider(player, leftCollideBounds, () => {
        cameraStop = true;
      });

      // console.log(cameraStop + " - " + camera.scrollX);
      if (leftBoundX && camera.scrollX <= leftBoundX) {
        cameraStop = true;
        player.setVelocityX(0);
      }
      if (cameraStop && leftBoundX) {
        camera.setScroll(leftBoundX, 0);
      }

      player.anims.play("right", true);
      player.flipX = true;
    } else if (player.body && !player.body.touching.down) {
      player.setTexture("p3_jump");
    } else {
      player.setVelocityX(0);
      player.setTexture("p3_walk2");
    }
  }
}

// Fonction pour ajouter une nouvelle image de plate-forme
function addPlatform() {
  let lastPlatform: Phaser.GameObjects.Sprite;
  if (platforms.getLast(true)) {
    lastPlatform = platforms.getLast(true); // Récupère la dernière image de platforms ajoutée
    let x = lastPlatform.x + lastPlatform.displayWidth; // Calculer la position X pour la nouvelle plateforms
    platforms.create(x, 600, "grassHalfMid").setScale(1).refreshBody(); // Créer une nouvelle image de plateforms
  } else {
    lastPlatform = platforms.getLast(false); // Récupère la dernière image de platforms ajoutée
    let x = 35; // Calculer la position X pour la nouvelle plateforms
    platforms.create(x, 600, "grassHalfMid").setScale(1).refreshBody(); // Créer une nouvelle image de plateforms
  }
}

export default game;
