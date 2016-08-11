var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'gameCanvas',
                                    { preload: preload,
                                      create: create,
                                      update: update,
                                      render: render});

function preload() {

    game.load.image('player', 'assets/circle.png');
    game.load.image('background','assets/debug-grid-1920x1920.png');


  //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
  this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

   //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
   this.stage.disableVisibilityChange = true;

    game.scale.windowConstraints.bottom = "visual";
}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  //game.stage.backgroundColor = '#0072bc';

    InitEnvironment();
    InitPlayer();



}

function update() {

  playerSprite.rotation = game.physics.arcade.moveToPointer(playerSprite, 60, game.input.activePointer, 1500);

}

function render(){

  //Debug info on the sprite
  game.debug.spriteInfo(playerSprite, 24, 24);
}

var playerSprite;
function InitPlayer(){

  playerSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

  //where to stop relative to the mouse position
  playerSprite.anchor.setTo(0.5, 0.5);

  //scaling the sprite image
  playerSprite.scale.setTo(0.3,0.3);


  //Enabling physics on the sprite
  game.physics.enable(playerSprite, Phaser.Physics.ARCADE);

  //We will handle the rotation of the sprite later
  playerSprite.body.allowRotation = false;


  game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_LOCKON);


}

function InitEnvironment(){

  game.world.setBounds(0, 0, 1920, 1920);

 game.add.tileSprite(0, 0, 1920, 1920, 'background');

}
