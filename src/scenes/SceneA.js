import Phaser from "phaser";
import { SimonControls } from "../character/simon/simonControls"

export class SceneA extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.cursors = null;
    this.cody = null;
  }

  


  preload() {
    this.load.image("bg", './assets/sceneOne/bg.jpg');
    this.load.spritesheet('brawler', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });
     
  
  }

  create() {
   
    const backgroundImage = this.add.image(0, 0, "bg").setOrigin(0);
    // Ajustar el tamaño para que ocupe toda la pantalla
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;

    const ground = this.add.rectangle(0, 450, 180, 300, 0x9d2d9d).setOrigin(0, 0);
    const ground2 = this.add.rectangle(280, 450, 800, 300, 0x9d2d9d).setOrigin(0, 0);
    this.physics.add.existing(ground, true);
    this.physics.add.existing(ground2, true);
    //ground.body.setImmovable(true);  
 


    this.cursors = this.input.keyboard.createCursorKeys();

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

    this.physics.add.collider(this.cody, [ground,ground2]);

     
    const fallSensor = this.add.zone(200, 500, 50, 50).setOrigin(0, 0);
        this.physics.add.existing(fallSensor);
        fallSensor.body.setAllowGravity(false);
        fallSensor.body.setImmovable(true);

        this.physics.add.overlap(this.cody, fallSensor, this.handleFall, null, this);
        this.cameras.main.startFollow(this.cody);
      }

  update() {
    
    const horizontalSpeed = 160; // Velocidad horizontal normal
    const airHorizontalSpeed = 80; // Velocidad horizontal en el aire


      if (this.cursors.right.isDown) {
        
        
        this.cody.setVelocityX(horizontalSpeed);
        this.cody.flipX = true;
        if (this.cody.anims.currentAnim.key !== 'walk') {
          this.cody.play('walk', true); // Jugar animación de caminar solo si no está ya en curso
        }
      }
       else if (this.cursors.left.isDown) {
       
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

  handleFall(player, sensor) {
    // Lógica para quitar una vida
    console.log("me cai!")
    this.lives -= 1;
    console.log(`Lives remaining: ${this.lives}`);
    
    // Reiniciar la posición del jugador
    this.cody.setPosition(100, 400);
    
    // Puedes añadir lógica adicional, como finalizar el juego cuando las vidas se acaban
    if (this.lives <= 0) {
        console.log('Game Over');
        // Aquí puedes reiniciar la escena o mostrar una pantalla de Game Over
    }
}
}
