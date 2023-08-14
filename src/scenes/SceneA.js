import Phaser from "phaser";

export class SceneA extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bg", "assets/sprites/imagen.png");
  }

  create() {

  }
}
