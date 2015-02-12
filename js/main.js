var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

function preload() {

    game.load.image('background','assets/wood.png');
    game.load.image('player','assets/phaser-dude.png');
	game.load.image('box','assets/box.jpg');
	game.load.image('cat','assets/cat.png');
}

var player;
var cursors;
var box;
var cats;
var count=0;
var text;
var hold=false;
var text2;

function create() {

	text=game.add.text(250,250,"Catch the cats and put them in the box!");
	text2=game.add.text(250,400,"You have caught:" + count + "cats!");
    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);
	cats = game.add.group();
    game.physics.startSystem(Phaser.Physics.ARCADE);

	box = game.add.sprite(1000, 1000, 'box');
	box.x=50;
	box.y=50;
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

	
	//  And add 10 sprites to it
    for (var i = 0; i < 10; i++)
    {
        //  Create a new sprite at a random world location
        cats.create(game.world.randomX, game.world.randomY, 'cat');
		cats.x=50;
		cats.y=50;
    }
	
    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

    //  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
    //  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
    //  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
    //  (until it reaches an edge of the world)
    game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);

	if(player
}

function update() {

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }
	
	if(game.physics.arcade.overlap(player,cats,null,null,this))
			{
				cats.exists=false;
				hold=true;
			}
			
	if(game.physics.arcade.overlap(player,box,null,null,this))
			{
				count++;
				hold=false;
			}
	

}

