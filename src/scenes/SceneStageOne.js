import Phaser from "phaser";
import { SimonControls } from "../character/simon/simonControls"

export class StageOneScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

this.ground=null;
this.ground2=null;
this.ground3=null;
this.groun=null;
this.step1=null;
this.step2=null;
this.step3=null;
this.step4=null;

this.fallSensor =null;
this.stageFinished =[];



    this.cursors = null;
    this.cody = null;
    this.lives = [];
    this.music= null;
    this.jumpAudio= null;
    this.dieAudio= null;
    this.yahooAudio= null;
    this.rightAudio= null;

    this.paper;
    this.wc;

    this.hasPaper = false;
    this.isPaused = false;

    this.text=null;
  }


  preload() {
    this.load.image("wc", "sceneOne/wc.png");
    this.load.image("paper", "sceneOne/paper.png");
    
    this.load.image("live", "sceneOne/heart.png");
    this.load.image("bg", "sceneOne/bg.jpg");
    this.load.image("floor", "sceneOne/floor.jpg");
    this.load.spritesheet('brawler', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });
  
    this.load.audio('backgroundMusic', ['sceneOne/music-bg.mp3']);
    this.load.audio('jumpSound', ['sceneOne/jump.mp3']);
    this.load.audio('die', ['sceneOne/die.mp3']);
    this.load.audio('gotit', ['sceneOne/correct.mp3']);
    this.load.audio('yahoo', ['sceneOne/yahoo.mp3']);
  
  }

  create() {
   
    this.loadAndPlayMusic();
       this.loadStage();
      this.loadSimon();   
     this.initGame();
     this.loadAnimations();

     this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

      }

  update() {
    //this.bg.tilePositionX -= .1;
    const horizontalSpeed = 160; // Velocidad horizontal normal
    const airHorizontalSpeed = 80; // Velocidad horizontal en el aire

     

      if (this.cursors.right.isDown) {
        
        //this.bg.tilePositionX += .1;
        this.cody.setVelocityX(horizontalSpeed);
        this.cody.flipX = true;
        if (this.cody.anims.currentAnim.key !== 'walk') {
          this.cody.play('walk', true); // Jugar animación de caminar solo si no está ya en curso
        }
      }
       else if (this.cursors.left.isDown) {
        //this.bg.tilePositionX -= .1;
        this.cody.setVelocityX(-horizontalSpeed);
        this.cody.flipX = false;
        if (this.cody.anims.currentAnim.key !== 'walk') {
          this.cody.play('walk', true); // Jugar animación de caminar solo si no está ya en curso
        }
      }

      
     else {
      this.cody.play('stop', true);  
      this.cody.setVelocityX(0);
    }

    if (!this.cody.body.onFloor()) {
      
      if (this.cody.body.velocity.x < 0) {
        this.cody.setVelocityX(-airHorizontalSpeed);
      } else if (this.cody.body.velocity.x > 0) {
        this.cody.setVelocityX(airHorizontalSpeed);
      }
    }

    if (this.cursors.up.isDown && this.cody.body.onFloor()) {   
      this.cody.setVelocityY(-250);
      this.cody.setVelocityX(-10);
      
      
      this.cody.play('jump', true);   
      this.jumpAudio.play(); 
    }
  
    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.isPaused = !this.isPaused;
      this.pauseGame(this, this.isPaused)
    }

    
  }

  loadAndPlayMusic(){
    this.music = this.sound.add('backgroundMusic', { loop: true });
    this.jumpAudio = this.sound.add('jumpSound', { loop: false });
    this.dieAudio = this.sound.add('die', { loop: false });
    this.gotitAudio = this.sound.add('gotit', { loop: false });
    this.yahooAudio = this.sound.add('yahoo', { loop: false });
    
     
    this.music.play();
    this.music.setVolume(0.3); 
  }

  loadStage(){
    this.bg =this.add.image(220, 280,  "bg").setScale(1.6);
    
   
    this.ground = this.add.image(0, 450, "floor").setOrigin(0, 0).setDisplaySize(180, 300);
    this.ground2 = this.add.image(280, 450,  "floor").setOrigin(0, 0).setDisplaySize( 200, 300);
    this.ground3 = this.add.image(630, 450,  "floor").setOrigin(0, 0).setDisplaySize(  65, 300);
    this.ground4 = this.add.image(0, 150,   "floor").setOrigin(0, 0).setDisplaySize( 385, 35);
    this.step1 = this.add.image(500, 350,  "floor").setOrigin(0, 0).setDisplaySize( 85, 35);
    this.step2 = this.add.image(620, 250,  "floor").setOrigin(0, 0).setDisplaySize( 85, 35 );
    this.step3 = this.add.image(700, 150,  "floor").setOrigin(0, 0).setDisplaySize( 85, 35);
    this.step4 = this.add.image(450, 180,  "floor").setOrigin(0, 0).setDisplaySize( 55, 35);
    this.physics.add.existing(this.ground, true);
    this.physics.add.existing(this.ground2, true);
    this.physics.add.existing(this.ground3, true);
    this.physics.add.existing(this.ground4, true);
    this.physics.add.existing(this.step1, true);
    this.physics.add.existing(this.step2, true);
    this.physics.add.existing(this.step3, true);
    this.physics.add.existing(this.step4, true);

    this.paper = this.add.image(740, 100,  "paper").setOrigin(0, 0).setDisplaySize( 45, 45);
    this.physics.add.existing(this.paper, true);
    this.wc = this.add.image(30, 60,  "wc").setOrigin(0, 0).setDisplaySize( 85, 95);
    this.physics.add.existing(this.wc, true);

    this.fallSensor = this.add.zone(200, 590, 700, 50).setOrigin(0, 0);
    this.physics.add.existing(this.fallSensor);
    this.fallSensor.body.setAllowGravity(false);
    this.fallSensor.body.setImmovable(true);

    
    
  }

  loadSimon(){
    this.cody = this.physics.add.sprite(100, 300, 'brawler');
    this.cody.setScale(3);
    this.cody.body.setSize(15, 30);  
        this.cody.body.setOffset(18, 18);
    this.cody.play('stop');
    this.cody.flipX = true;

      

    // Set collider between Simon and the stage
    this.cody.setCollideWorldBounds(true);

    this.physics.add.collider(this.cody, [this.ground,this.ground2, this.ground3, this.ground4]);
    this.physics.add.collider(this.cody, this.step1, null, this.handleStepCollision, this);
    this.physics.add.collider(this.cody, this.step2, null, this.handleStepCollision, this);
    this.physics.add.collider(this.cody, this.step3, null, this.handleStepCollision, this);
    this.physics.add.collider(this.cody, this.step4, null, this.handleStepCollision, this);

    this.physics.add.overlap(this.cody, this.fallSensor, this.handleFall, null, this);
    this.physics.add.overlap(this.cody, this.wc, this.inToilet, null, this);
  }

  initGame(){
    this.hasPaper= false;
    this.setLives();
    this.paper?.setAlpha(1);
    
    this.physics.add.overlap(this.cody, this.paper, (paper)=>{this.getPaper(paper)}, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.input.keyboard.off('keydown-SPACE');
  }
  
  loadAnimations(){
       // Animation set
       this.anims.create({
        key: 'stop',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 5 ] }),
        frameRate: 8,
        repeat: -1
    });


      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 5, 6, 7, 8 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'kick',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 10, 11, 12, 13, 10 ] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
    });

    this.anims.create({
        key: 'punch',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 15, 16, 17, 18, 17, 15 ] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 20, 21, 22, 23 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'jumpkick',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 20, 21, 22, 23, 25, 23, 22, 21 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'win',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 30, 31 ] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
    });

    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 35, 36, 37 ] }),
        frameRate: 8,
    });

  }

  setLives(){
    this.lives.push(this.add.image(700, 580, "live").setScale(0.01));
     this.lives.push(this.add.image(740, 580, "live").setScale(0.01));
    this.lives.push(this.add.image(780, 580, "live").setScale(0.01));
    
    
   }

  handleFall(player, sensor) { 

    this.dieAudio.play();
    this.loseLife(sensor);
   
    // Reiniciar la posición del jugador
    this.cody.setPosition(100, 350);
    
  }
  getPaper(myPaper){ 
    if (!this.hasPaper){
      this.hasPaper= true; 
      this.gotitAudio.play();
     this.paper.setAlpha(0);
    }
  }

  inToilet(){ 
     if(this.hasPaper && !this.stageFinished[0]){
      
      this.yahooAudio.play();
      this.finishStage();
      
    }
  }

  loseLife(sensor) { 
    if (this.lives.length > 1) {
        this.life= this.lives.shift(); // Obtén la última vida de la matriz
         
        this.life.destroy(); // Destruye la imagen
      }else{
        this.life= this.lives.shift();
        this.life?.destroy(); // Destruye la imagen
       this.showGameOver(sensor);
    }
 
  }
  
  showGameOver(sensor) {
     
    this.pauseScene(sensor.scene)
    this.showText("Game Over");

     // Configurar un evento solo para la barra espaciadora
   this.input.keyboard.on('keydown-SPACE', () => {
    
    
      this.unpauseScene(sensor.scene);
       
        this.initGame();
        
   });

}

 
pauseGame(scene, isPaused){ 
  if (isPaused){ 
    this.showText("PAUSE");
    this.pauseScene(scene);
  }else{
    this.unpauseScene();
 
  }

 
    
      
      

}

pauseScene(scene){
  this.isPaused= true;

  //Stop music
  this.music.stop();

  // Eliminar los eventos de las teclas de flecha
  scene.cursors.left = false;
  scene.cursors.down = false;
  scene.cursors.up = false;
  scene.cursors.right = false;

  // pause Simon
  this.physics.pause();
  this.cody.anims.pause();

  
   this.bg.setAlpha(0.5)
}

unpauseScene(){
  this.text.setAlpha(0);
  this.bg.setAlpha(1);
  this.music.play()
  this.isPaused= false;
  this.physics.resume();
  this.cody.anims.resume();
  this.cursors = this.input.keyboard.createCursorKeys();
  this.text.destroy();
}

isFalling(cody) {
  return cody.body.velocity.y > 0;
}
handleStepCollision(cody, step) {
  return this.isFalling(cody);
}

showText(text){
   // Crear el texto de "Game Over", inicialmente invisible
this.text = this.add.text(400, 300, text, {
  fontSize: '64px',
  fill: '#ff0000'
}).setOrigin(0.5).setAlpha(1);

}

finishStage(){
  this.pauseScene(this);
  this.showText("Thank you!")
  this.stageFinished.push(1);

  this.time.delayedCall(4000, function() {
  this.scene.start('TitleScene');
   }, [], this);
}

}
