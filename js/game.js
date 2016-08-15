var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'gameCanvas',
                                    { preload: preload,
                                      create: create,
                                      update: update,
                                      render: render});

function preload() {

    game.load.image('player', 'assets/circle.png');
    game.load.image('background','assets/debug-grid-1920x1920.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('diamond', 'assets/diamond.png');


  //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
  this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

   //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
   this.stage.disableVisibilityChange = true;

   game.scale.windowConstraints.bottom = "visual";
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    InitEnvironment();
    InitObjects();
    InitPlayer();

}

function update() {

    //  If the sprite is > 8px away from the pointer then let's move to it
     if (game.physics.arcade.distanceToPointer(player, game.input.activePointer) > 8)
     {
         //  Make the object seek to the active pointer (mouse or touch).
        player.rotation = game.physics.arcade.moveToPointer(player, 250);
     }
     else
     {
         //  Otherwise turn off velocity because we're close enough to the pointer
         player.body.velocity.set(0);
     }



   //We want to control how many objects can spawn at one time
    if (game.nextEnemyAt < game.time.now && pickupObjs.countDead() > 0) {
        game.nextEnemyAt = game.time.now;
        var item = pickupObjs.getFirstExists(false);

        // spawn at a random location on the map, with a buffer so sprites don't get clipped
        var buffer = 20;
        item.reset(game.rnd.integerInRange(buffer, game.world.bounds.width - buffer), game.rnd.integerInRange(buffer, game.world.bounds.height - buffer));
    }

    //Allow the player to be able to collect objects
    game.physics.arcade.overlap(player, pickupObjs, CollectObject,null,this);

}

function render(){

  //Debug info on the sprite
  //game.debug.spriteInfo(player, 24, 24);
}

var player;
function InitPlayer(){

  player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

  //where to stop relative to the mouse position
  player.anchor.setTo(0.5, 0.5);

  //scaling the sprite image
  player.scale.setTo(0.3,0.3);


  //Enabling physics on the sprite
  game.physics.enable(player, Phaser.Physics.ARCADE);

  //We will handle the rotation of the sprite later
  player.body.allowRotation = false;


  game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);


}

function InitEnvironment(){

  game.world.setBounds(0, 0, 1920, 1920);

 game.add.tileSprite(0, 0, 1920, 1920, 'background');

}

var pickupObjs;
function InitObjects(){

    pickupObjs = game.add.group();
    pickupObjs.enableBody = true;
    pickupObjs.physicsBodyType = Phaser.Physics.ARCADE;
    pickupObjs.createMultiple(100, 'star');
    pickupObjs.setAll('anchor.x', 0.5);
    pickupObjs.setAll('anchor.y', 0.5);
    pickupObjs.setAll('outOfBoundsKill', true);
    pickupObjs.setAll('checkWorldBounds', true);

    game.nextEnemyAt = 0;

}

function CollectObject(player, object){

  object.kill();

}
