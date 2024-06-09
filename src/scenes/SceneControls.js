import Phaser from "phaser";

export class ControlsScene extends Phaser.Scene {
  constructor() {
    super("controls");
    this.cursors = null;
    this.cody = null;
    this.lives = [];
    this.music= null;
    this.jump= null;
    this.die= null;
    this.yahoo= null;
    this.right= null;

    this.paper;
    this.wc;

    this.hasPaper = false;
  }

  preload() {
    this.load.image("arows", "sceneTitle/arrowsKeys.png");
  }

  create() {
   
       // Mostrar instrucciones en pantalla
       this.add.text(280, 40, 'Use the arrow keys to move', { fontSize: '16px', fill: '#FFF' });
       this.add.image(265, 70, "arows").setOrigin(0, 0).setDisplaySize(290,220);
       this.add.text(280, 340, 'Press the spacebar to pause', { fontSize: '16px', fill: '#FFF' });

       const goBackButton =  this.add.text(300, 500, ' Go Back', { fontSize: '16px', fill: '#FFF' }).setScale(2);

       // Interactive go back
       goBackButton.setInteractive();
       goBackButton.on('pointerdown', () => {
        this.scene.start('TitleScene');
    });
       
      }

  update() {
  
  
  }

  

}

 
 
