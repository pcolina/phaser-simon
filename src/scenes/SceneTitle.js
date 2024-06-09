import Phaser from "phaser";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
    this.cursors = null;
    
  }

  preload() {
    this.load.image('knighthawks', 'sceneTitle/knight3.png');
   
  }

  create() {


    const controlsButton = this.add.text(400, 400, 'Controls', { fontSize: '22px', fill: '#fff' }).setOrigin(0.5);
    const playButton = this.add.text(400, 440, 'play', { fontSize: '22px', fill: '#fff' }).setOrigin(0.5);
 
    
    var config = {
      image: 'knighthawks',
      width: 31,
      height: 25,
      chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
      charsPerRow: 10,
      spacing: { x: 1, y: 1 }
  };

  this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));

  this.dynamic = this.add.bitmapText(80, 200, 'knighthawks' ,'SIMON');
  this.dynamic.setScale(4);
  
    playButton.setInteractive();
    controlsButton.setInteractive();

    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
  });
  controlsButton.on('pointerdown', () => {
      this.scene.start('controls');
  });
  }

  
}
