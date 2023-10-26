class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/hq-explosion-6288.mp3')
        this.load.audio('sfx_explosion3', './assets/asteroid-hitting-something-152511.mp3')
        this.load.audio('sfx_explosion4', './assets/vine-boom-162668.mp3')
        this.load.audio('sfx_explosion_UFO', './assets/message-incoming-132126.mp3')
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav')
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.control = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*6, 'Click SPACE for mouse control', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Mouse_tmp = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
          this.Mouse_tmp = 1;
          this.control.text = 'Control switched to mouse'
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          game.settings = {
            controlMouse: false,
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          if(this.Mouse_tmp == 1){
            game.settings = {
              controlMouse: true,
              spaceshipSpeed: 3,
              gameTimer: 60000
            }
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          game.settings = {
            controlMouse: false,
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          if(this.Mouse_tmp == 1){
            game.settings = {
              controlMouse: true,
              spaceshipSpeed: 4,
              gameTimer: 45000
            }
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}