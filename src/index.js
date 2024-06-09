import Phaser from "phaser";
import { TitleScene } from "./scenes/SceneTitle.js";
import { ControlsScene } from "./scenes/SceneControls.js";
import { StageOneScene } from "./scenes/SceneStageOne.js";
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
  scene: [  TitleScene, ControlsScene, StageOneScene]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
