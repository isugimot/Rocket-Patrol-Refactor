class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('UFO', './assets/UFO.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0,0, 640, 480, 'starfield2').setOrigin(0,0);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*5, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*10, borderUISize*4, 'UFO', 0, 100).setOrigin(0, 0);
        this.ship04.moveSpeed = game.settings.spaceshipSpeed * 3;

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });

        this.p1Score = 0;
        this.p2Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.height - borderUISize - borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        this.playerside = this.add.text(game.config.height/2, borderUISize + borderPadding*2, "PL 1", scoreConfig);

        this.number = Phaser.Math.FloatBetween(1, 4);
        this.round = 1;
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.playerSwitch = this.time.delayedCall(game.settings.gameTimer, () => {
            this.round += 1;
            this.p1Rocket.reset();
            this.p1Rocket.x = game.config.width/2;
            this.ship01.reset();
            this.ship01.x = game.config.width + borderUISize*6;
            this.ship01.y = borderUISize*5;
            this.ship02.reset();
            this.ship02.x = game.config.width + borderUISize*3;
            this.ship02.y =  borderUISize*6;
            this.ship03.reset();
            this.ship03.x = game.config.width;
            this.ship03.y = borderUISize*6 + borderPadding*5;
            this.ship04.reset();
            this.ship04.x = game.config.width + borderUISize*10;
            this.ship04.y = borderUISize*4;
            this.playerside.text = "PL 2";
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer*2, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            if(this.p1Score > this.p2Score){
                this.add.text(game.config.width/2,game.config.height/2 + 64, 'PLAYER 1 WINS', scoreConfig).setOrigin(0.5);
            }else if(this.p2Score > this.p1Score){
                this.add.text(game.config.width/2,game.config.height/2 + 64, 'PLAYER 2 WINS', scoreConfig).setOrigin(0.5);
            }else{
                this.add.text(game.config.width/2,game.config.height/2 + 64, 'DRAW', scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.round = 1;
        }, null, this);
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 10;

        if(!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        if(this.round <= 2){
            if(this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship03, this.number);
                this.number = Phaser.Math.Between(1, 4);
            }
            if (this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship02, this.number);
                this.number = Phaser.Math.Between(1, 4);
            }
            if (this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship01, this.number);
                this.number = Phaser.Math.Between(1, 4);
            }
            if (this.checkCollision(this.p1Rocket, this.ship04)) {
                this.p1Rocket.reset();
                this.number = 0;
                this.shipExplode(this.ship04, this.number);
                this.number = Phaser.Math.Between(1, 4);
            }
        }
    }

    checkCollision(rocket, ship) {
 
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, value) {

        ship.alpha = 0;                         
 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        if(this.round == 1){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score; 
        }else if(this.round == 2){
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score; 
        }
        if(value == 1){
            this.sound.play('sfx_explosion');
        }else if(value == 2){
            this.sound.play('sfx_explosion2');
        }else if(value == 3){
            this.sound.play('sfx_explosion3');
        }else if(value == 4){
            this.sound.play('sfx_explosion4');
        }else if(value == 0){
            this.sound.play('sfx_explosion_UFO');
        }
        
      }
}