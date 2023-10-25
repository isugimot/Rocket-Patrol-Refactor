/*Ichiro Sugimoto
Rocket Patrol Reloaded for 2 Player
Time took: Approximately 12 hours?
Mod chosen:
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
- Implement an alternating two-player mode (5)
- Implement parallax scrolling for the background (3)
!- Create 4 new explosion sound effects and randomize which one plays on impact (3)
- Implement mouse control for player movement and mouse click to fire (5)
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT, keySpace, mouseLEFT;