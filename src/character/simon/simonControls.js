

export class SimonControls {
    constructor(scene, cody, cursors, animation ) {
        this.scene = scene; 
        this.cursors = cursors; 
        this.cody = cody;
        this.animsSimon = animation;
        console.log(this.anims)
    }

    create() {


        // Animation set
      this.animsSimon.create({
        key: 'stop',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 5 ] }),
        frameRate: 8,
        repeat: -1
    });


      this.animsSimon.create({
        key: 'walk',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.animsSimon.create({
        key: 'idle',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 5, 6, 7, 8 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.animsSimon.create({
        key: 'kick',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 10, 11, 12, 13, 10 ] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
    });

    this.animsSimon.create({
        key: 'punch',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 15, 16, 17, 18, 17, 15 ] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
    });

    this.animsSimon.create({
        key: 'jump',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 20, 21, 22, 23 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.animsSimon.create({
        key: 'jumpkick',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 20, 21, 22, 23, 25, 23, 22, 21 ] }),
        frameRate: 8,
        repeat: -1
    });

    this.animsSimon.create({
        key: 'win',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 30, 31 ] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
    });

    this.animsSimon.create({
        key: 'die',
        frames: this.animsSimon.generateFrameNumbers('brawler', { frames: [ 35, 36, 37 ] }),
        frameRate: 8,
    });
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
        } else if (this.cursors.left.isDown) {
            this.cody.setVelocityX(-horizontalSpeed);
            this.cody.flipX = false;
            if (this.cody.anims.currentAnim.key !== 'walk') {
                this.cody.play('walk', true); // Jugar animación de caminar solo si no está ya en curso
            }
        } else {
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
}
