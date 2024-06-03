import Phaser from "phaser";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
    this.cursors = null;
    
  }

  


  preload() {
    this.load.image("bg", './assets/sceneOne/bg.jpg');
     
  
  }

  create() {
    this.add.text(400, 300, 'SIMÓN', { fontSize: '82px', fill: '#fff' }).setOrigin(0.5);

    const playButton = this.add.text(400, 400, 'Play', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
    playButton.setInteractive();

    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
  });
  }
}
