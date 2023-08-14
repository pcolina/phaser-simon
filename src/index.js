import Phaser from "phaser";
import { SceneA } from "./scenes/SceneA.js";
import { width, height } from "./modules/constants.js";

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: "#000",
  scene: [SceneA]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
