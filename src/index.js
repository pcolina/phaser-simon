import Phaser from "phaser";
import { SceneA } from "./SceneA.js";
import { TitleScene } from "./scenes/SceneStart.js";
import { width, height } from "./modules/constants.js";

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: "#000",
  physics: {
    default: 'arcade',   
    arcade: {
      gravity: { y: 300 },   
      debug: false   
    }
  },
  scene: [ SceneA]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
