// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game

var w = 500;
var h = 350;
var game = new Phaser.Game(w, h, Phaser.AUTO, 'game-div');

// This is an array to store the different states of our game. A state is a specific scene of a game like a menu, a game over screen, etc.
var game_state = {};

// And now we define our first and only state, I'll call it 'main' 
game_state.main = function() { };  
game_state.main.prototype = {
    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
        // Load a sprite in the game
		game.stage.backgroundColor = '#71c5cf';
		game.load.image('player', './assets/player.png');
        game.load.image('brick', './assets/brick.png');
        game.load.image('no-block', './assets/no-block.png');
        game.load.image('bullet', './assets/bullet.png');
		game.load.image('enemy', './assets/enemy.png');
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
        // Display a sprite on the screen
		// Parameters: x position, y position, name of the sprite
        this.player = game.add.sprite(w/2, h/2, 'player');
        this.player.scale.setTo(0.5,0.5);
        this.player.anchor.setTo(0.5,0.5);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 1000;
        this.player.health = 1;
        this.facing = Phaser.LEFT;

        //Give default weapon
        this.currentWeapon = Weapon.getWeapon(0);

        this.keyboard = game.input.keyboard.createCursorKeys();
        this.keyboard.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.buildLevel();
        
        this.bullets = game.add.group();
        this.bullets.createMultiple(5, 'bullet');
        this.bullets.setAll('outOfBoundsKill', true);

        this.bulletTime = game.time.now; //Used for weapon cooldown

        this.enemies = game.add.group();
        this.enemies.createMultiple(5, 'enemy');
        this.enemies.setAll('outOfBoundsKill', true);

        //TODO Add kill event listeners
        this.player.events.onKilled.add(this.playerDie, this);

        Enemies.getRandomEnemy()(this);
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.

        game.physics.collide(this.player, this.platforms);
        game.physics.collide(this.enemies, this.platforms);
        game.physics.collide(this.player, this.walls);
        game.physics.collide(this.player, this.roof);
        game.physics.overlap(this.enemies, this.player, this.enemyPlayer, null, this);
        game.physics.overlap(this.enemies, this.walls, this.enemyWall, null, this);
        game.physics.overlap(this.enemies, this.basement, this.enemyBasement, null, this);
        game.physics.overlap(this.player, this.basement, this.playerBasement, null, this);
        game.physics.overlap(this.bullets, this.platforms, this.bulletPlatform, null, this);
        game.physics.overlap(this.bullets, this.walls, this.bulletPlatform, null, this);


        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.keyboard.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;
            this.facing = Phaser.LEFT;

            //this.player.animations.play('left');
        }
        else if (this.keyboard.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;
            this.facing = Phaser.RIGHT;

            //this.player.animations.play('right');
        }
        else
        {
            //  Stand still
            //this.player.animations.stop();

            //this.player.frame = 4;
        }

        //Shoot
        if (this.keyboard.space.isDown){
            this.currentWeapon.shoot(this);
        }

        //  Allow the this.player to jump if they are touching the ground.
        if (this.keyboard.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -450;
        }
    } ,
    bulletPlatform: function(bullet, platform){
        bullet.kill();
        //this.bullets.remove(bullet);
    },
    enemyWall: function(enemy, wall){
        enemy.body.velocity.x *= -1;
        enemy.scale.x *= -1;
    },
    enemyBasement: function(enemy, basement){
        enemy.body.velocity.x *= -1.5;
        enemy.scale.x *= -1;
        enemy.body.y = 0;
    },
    enemyPlayer: function(enemy, player){
        enemy.damage(1);
        player.damage(1);
    },
    enemyBullet: function(enemy, bullet){
        bullet.kill();
        enemy.damage(bullet.damage);
    },
    playerBasement: function(player, basement){
        player.damage(99);
    },
    playerDie: function(player){
        //TODO add nice particle effects
        //TODO add game over/restart
    },
    enemyDie: function(enemy){
        //TODO add nice particle effects
    },
    bulletDie: function(bullet){
        //TODO add nice particle effects
    },
    buildLevel: function() {
    	this.platforms = game.add.group();
    	this.walls = game.add.group();
    	
    	var bottom1 = this.platforms.create(0, h, 'brick');
    	bottom1.anchor.setTo(0, 1);
 		bottom1.scale.setTo(11, 1);
    	
    	var bottom1bis = this.platforms.create(0, h-20, 'brick');
    	bottom1bis.anchor.setTo(0, 1);
 		bottom1bis.scale.setTo(4, 1);

    	var bottom2 = this.platforms.create(w/2+30, h, 'brick');
    	bottom2.anchor.setTo(0, 1);
 		bottom2.scale.setTo(11, 1);

    	var bottom2bis = this.platforms.create(w/2+170, h-20, 'brick');
    	bottom2bis.anchor.setTo(0, 1);
 		bottom2bis.scale.setTo(4, 1);

    	var top1 = this.platforms.create(0, 0, 'brick');
    	top1.anchor.setTo(0, 0);
 		top1.scale.setTo(9, 1); 

    	var top2 = this.platforms.create(w/2+60, 0, 'brick');
    	top2.anchor.setTo(0, 0);
 		top2.scale.setTo(9, 1); 

    	var left = this.walls.create(0, 0, 'brick');
    	left.anchor.setTo(0, 0);
 		left.scale.setTo(1, 17.5); 

    	var right = this.walls.create(w, 0, 'brick');
    	right.anchor.setTo(1, 0);
 		right.scale.setTo(1, 17.5); 

    	var middle1 = this.platforms.create(w/2, h*1/4+10, 'brick');
    	middle1.anchor.setTo(0.5, 0.5);
 		middle1.scale.setTo(14, 1); 

    	var middle2 = this.platforms.create(w/2, h*3/4-10, 'brick');
    	middle2.anchor.setTo(0.5, 0.5);
 		middle2.scale.setTo(14, 1); 

     	var middle3 = this.platforms.create(0, h/2, 'brick');
    	middle3.anchor.setTo(0, 0.5);
 		middle3.scale.setTo(5, 1); 

      	var middle4 = this.platforms.create(w/2+150, h/2, 'brick');
        middle4.anchor.setTo(0, 0.5);
        middle4.scale.setTo(5, 1); 


        this.roof = game.add.sprite(w/2 -60, 0, 'no-block');
        this.roof.anchor.setTo(0, 0);
        this.roof.scale.setTo(6, 1); 

        this.basement = game.add.sprite(220, h, 'no-block');
    	this.basement.anchor.setTo(0, 0);
 		this.basement.scale.setTo(3, 1); 

 		this.platforms.setAll('body.immovable', true);
        this.walls.setAll('body.immovable', true);
        this.roof.body.immovable = true;
 		this.basement.body.immovable = true;
	}
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', game_state.main);  
game.state.start('main');  