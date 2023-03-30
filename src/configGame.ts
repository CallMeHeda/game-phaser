import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function preload(): void {}

function create(): void {}

function update(): void {}

const game = new Phaser.Game(config);

export default game;
