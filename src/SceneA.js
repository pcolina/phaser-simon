import Phaser from "phaser";
import { SimonControls } from "./character/simon/simonControls"

export class SceneA extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.cursors = null;
    this.cody = null;
    this.lives = [];
  }

  


  preload() {
     
    this.load.image("live", "sceneOne/heart.png");
    this.load.image("bg", "sceneOne/bg.jpg");
    this.load.image("floor", "sceneOne/floor.jpg");
    this.load.spritesheet('brawler', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });
  
  
  }

  create() {
   
    
    this.bg =this.add.image(220, 280,  "bg").setScale(1.6);
    
    // Ajustar el tamaño para que ocupe toda la pantalla
    // backgroundImage.displayWidth = this.sys.game.config.width;
    // backgroundImage.displayHeight = this.sys.game.config.height;

    const ground = this.add.image(0, 450, "floor").setOrigin(0, 0).setDisplaySize(180, 300);
    const ground2 = this.add.image(280, 450,  "floor").setOrigin(0, 0).setDisplaySize( 200, 300);
    const ground3 = this.add.image(630, 450,  "floor").setOrigin(0, 0).setDisplaySize(  65, 300);
    const ground4 = this.add.image(0, 150,   "floor").setOrigin(0, 0).setDisplaySize( 385, 35);
    const step1 = this.add.image(500, 350,  "floor").setOrigin(0, 0).setDisplaySize( 85, 35);
    const step2 = this.add.image(620, 250,  "floor").setOrigin(0, 0).setDisplaySize( 85, 35 );
    const step3 = this.add.image(700, 150,  "floor").setOrigin(0, 0).setDisplaySize( 85, 35);
    const step4 = this.add.image(450, 180,  "floor").setOrigin(0, 0).setDisplaySize( 55, 35);
    this.physics.add.existing(ground, true);
    this.physics.add.existing(ground2, true);
    this.physics.add.existing(ground3, true);
    this.physics.add.existing(ground4, true);
    this.physics.add.existing(step1, true);
    this.physics.add.existing(step2, true);
    this.physics.add.existing(step3, true);
    this.physics.add.existing(step4, true);
    //ground.body.setImmovable(true);  
 

    this.initGame();

 
    
    


    // Crear el texto de "Game Over", inicialmente invisible
this.gameOverText = this.add.text(400, 300, 'Game Over', {
  fontSize: '64px',
  fill: '#ff0000'
}).setOrigin(0.5).setAlpha(0);


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

    //this.cody = this.add.sprite(100, 380);
    this.cody = this.physics.add.sprite(100, 300, 'brawler');
    this.cody.setScale(3);
    this.cody.body.setSize(15, 30);  
        this.cody.body.setOffset(18, 18);
    this.cody.play('stop');
    this.cody.flipX = true;
    //this.cody.setCollideWorldBounds(true);

    this.cody.setCollideWorldBounds(true); // Evita que el sprite salga del mundo

    this.physics.add.collider(this.cody, [ground,ground2, ground3, ground4]);
    this.physics.add.collider(this.cody, step1, null, this.handleStepCollision, this);
    this.physics.add.collider(this.cody, step2, null, this.handleStepCollision, this);
    this.physics.add.collider(this.cody, step3, null, this.handleStepCollision, this);
    this.physics.add.collider(this.cody, step4, null, this.handleStepCollision, this);

     
    const fallSensor = this.add.zone(200, 500, 500, 50).setOrigin(0, 0);
        this.physics.add.existing(fallSensor);
        fallSensor.body.setAllowGravity(false);
        fallSensor.body.setImmovable(true);

        this.physics.add.overlap(this.cody, fallSensor, this.handleFall, null, this);
        //this.cameras.main.startFollow(this.cody);
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
      
         
      console.log("salté!")
          this.cody.play('jump', true);   
      
    }
  
  }

  initGame(){
    this.setLives();
    this.cursors = this.input.keyboard.createCursorKeys();
    
     
  }
  
  setLives(){
    this.lives.push(this.add.image(700, 580, "live").setScale(0.01));
     this.lives.push(this.add.image(740, 580, "live").setScale(0.01));
    this.lives.push(this.add.image(780, 580, "live").setScale(0.01));
    
    console.log("nuevas vidas!")
   }

  handleFall(player, sensor) {
    // Lógica para quitar una vida
    console.log("me cai!")
    
    this.loseLife(sensor);
   
    // Reiniciar la posición del jugador
    this.cody.setPosition(100, 350);
    
  }

  loseLife(sensor) {
    console.log("pierde vida")
    if (this.lives.length > 1) {
        this.life= this.lives.shift(); // Obtén la última vida de la matriz
        console.log(`nuevas vidas: ${this.lives.length}`);
        this.life.destroy(); // Destruye la imagen
      }else{
        this.life= this.lives.shift();
        this.life.destroy(); // Destruye la imagen
       this.showGameOver(sensor);
    }
 
  }
  
  showGameOver(sensor) {
     
    this.gameOverText?.setAlpha(1);
     sensor.scene.bg.setAlpha(0.5);
   
     // Eliminar los eventos de las teclas de flecha
     sensor.scene.cursors.left = false;
     sensor.scene.cursors.down = false;
     sensor.scene.cursors.up = false;
     sensor.scene.cursors.right = false;
     

     // Configurar un evento solo para la barra espaciadora
     this.input.keyboard.on('keydown-SPACE', () => {
         // Lógica para la barra espaciadora
         this.gameOverText.setAlpha(0);
         sensor.scene.bg.setAlpha(1);
         this.initGame();
     });

}

isFalling(cody) {
  return cody.body.velocity.y > 0;
}
handleStepCollision(cody, step) {
  return this.isFalling(cody);
}


}
