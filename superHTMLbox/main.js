// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game

var w = 640;
var h = 480;
var score = 0;
var game = new Phaser.Game(w, h, Phaser.AUTO, 'game-div');
var gravityMultiplier = 1;//18/1000;

// This is an array to store the different states of our game. A state is a specific scene of a game like a menu, a game over screen, etc.
var game_state = {};

// And now we define our first and only state, I'll call it 'main' 
game_state.main = function() { };  
game_state.main.prototype = {
	preload: function() {
		// Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
		// Load a sprite in the game
		game.stage.backgroundColor = '#71c5cf';
		game.load.tilemap('level1', './assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles-1', './assets/tiles-1.png');
		game.load.image('player', './assets/player.png');
		game.load.image('crate', './assets/brick.png');
		game.load.image('no-block', './assets/no-block.png');
		game.load.image('bullet', './assets/bullet.png');
		game.load.image('smallEnemy', './assets/enemy.png');
		game.load.image('bigEnemy', './assets/bigEnemy.png');
	},

	create: function() { 
		// This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 500;
		// Display a sprite on the screen
		// Parameters: x position, y position, name of the sprite
		this.map = game.add.tilemap('level1');
		this.map.addTilesetImage('tiles-1');
		this.map.setCollisionByExclusion([ ]);

		this.platforms  = this.map.createLayer('Platforms');
		//TODO Use simple sprites or différent tilemaps for collision
		//TODO Use a background layer for decoration?
		//this.basement = this.map.createLayer('Basement');
		//this.roof     = this.map.createLayer('Roof');
		//this.layer.resizeWorld();

		this.basement = game.add.sprite(w/2-50, h-20, 'no-block');
		game.physics.enable(this.basement, Phaser.Physics.ARCADE);
		this.basement.body.allowGravity = false;
		//TODO replace by a body?
		//this.basement.body.immovable = true;

		this.player = game.add.sprite(w/2, h/2, 'player');
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		//this.player.scale.setTo(0.5,0.5);
		//this.player.anchor.setTo(0.5,0.5);

		this.player.body.bounce.y = 0.2;
		//this.player.body.gravity.y = 1000 * gravityMultiplier;
		//this.player.body.minVelocity.y = 5;
		this.player.health = 0;
		this.player.velocity = 180;
		this.facing = Phaser.LEFT;

		//Give default weapon
		this.currentWeapon = Weapon.getWeapon(0);
		document.getElementById("weapon").innerHTML = this.currentWeapon.name;

		this.keyboard = game.input.keyboard.createCursorKeys();
		this.keyboard.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//this.buildLevel();
		
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
    	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(50, 'bullet');
		this.bullets.setAll('outOfBoundsKill', true);

		this.bulletTime = game.time.now; //Used for weapon cooldown

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
    	this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    	/*this.smallEnemies = game.add.group();
    	this.bigEnemies = game.add.group();
    	this.enemies.add(this.smallEnemies);
    	this.enemies.add(this.bigEnemies);
		this.smallEnemies.enableBody = true;
    	this.smallEnemies.physicsBodyType = Phaser.Physics.ARCADE;
		this.bigEnemies.enableBody = true;
    	this.bigEnemies.physicsBodyType = Phaser.Physics.ARCADE;*/

		this.enemies.createMultiple(20, 'smallEnemy');
		//this.bigEnemies.createMultiple(5, 'bigEnemy');
		this.enemies.setAll('outOfBoundsKill', true);

		//TODO Add kill event listeners
		this.player.events.onKilled.add(this.playerDie, this);
		//this.enemies.callAll('events.onKilled.add', null, this.enemyDie, this);

		this.enemyTime = this.game.time.now +1500;

		//Crates
		//Differentzones where a crate can appear
		this.crateApparitionZones = [
			{ xMin:20, xMax:w-40, yMin:20,  yMax:100},
			{ xMin:20, xMax:w-40, yMin:120, yMax:160}
			//TODO Divide in equal zones
			//TODO fixed altitude
		]

		//first crate
		this.crate = game.add.sprite(-50, -50, 'crate');
		game.physics.enable(this.crate, Phaser.Physics.ARCADE);
		//this.crate.body.gravity.y = 1000 * gravityMultiplier;
		this.newCrate();

		//score
		this.score = document.getElementById("score").innerHTML = this.score = 0;
	},

	update: function() {
		// This is where we will spend the most of our time. This function is called 60 times per second to update the game.

		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.crate, this.platforms);
		game.physics.arcade.collide(this.enemies, this.platforms);
		game.physics.arcade.overlap(this.bullets, this.platforms, this.bulletPlatform, null, this);
		game.physics.arcade.overlap(this.player, this.crate, this.playerCrate, null, this);
		//game.physics.arcade.collide(this.player, this.roof);
		//game.physics.arcade.collide(this.player, this.basement);
		//game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.overlap(this.enemies, this.player, this.enemyPlayer, null, this);
		//game.physics.overlap(this.enemies, this.walls, this.enemyWall, null, this);
		game.physics.arcade.overlap(this.enemies, this.basement, this.enemyBasement, null, this);
		game.physics.arcade.overlap(this.player, this.basement, this.playerBasement, null, this);
		//game.physics.arcade.overlap(this.bullets, this.walls, this.bulletPlatform, null, this);
		game.physics.arcade.overlap(this.enemies, this.bullets, this.enemyBullet, null, this);
		game.physics.arcade.overlap(this.player, this.bullets, this.playerBullet, null, this);


		this.enemies.forEachAlive(this.updateEnemy, this);
		//  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if (this.keyboard.left.isDown)
		{
			//  Move to the left
			this.player.body.velocity.x = -this.player.velocity;
			this.facing = Phaser.LEFT;

			//this.player.animations.play('left');
		}
		else if (this.keyboard.right.isDown)
		{
			//  Move to the right
			this.player.body.velocity.x = this.player.velocity;
			this.facing = Phaser.RIGHT;

			//this.player.animations.play('right');
		}
		else
		{
			//  Stand still
			//this.player.animations.stop();

			//this.player.frame = 4;
		}

		//  Allow the this.player to jump if they are touching the ground.
		if (this.keyboard.up.isDown && this.player.body.onFloor())
		{
			this.player.body.velocity.y = -450;
		}

		//Shoot
		if (this.keyboard.space.isDown && this.player.alive){
			this.currentWeapon.shoot(this);
		}

		//Add new enemies
		if (this.game.time.now > this.enemyTime && this.player.alive) {
			this.enemyTime = game.time.now + 1500 + Math.floor(Math.random()*500);
			this.newEnemy();
		}
	} ,
	newEnemy: function(){
		Enemies.getRandomEnemy()(this);
	},
	newCrate: function(){
		var zone = this.crateApparitionZones[Math.floor(Math.random() * this.crateApparitionZones.length)];;
		var crate = {
			x: (Math.floor(Math.random() * (zone.xMax - zone.xMin)) + zone.xMin),
			y: (Math.floor(Math.random() * (zone.yMax - zone.yMin)) + zone.yMin)
		};
		this.crate.reset(crate.x, crate.y);
	},
	playerBullet: function(player, bullet){
		if(bullet.properties.weaponName == "disc launcher" && bullet.properties.bounceCount == 0){
			player.damage(1);
			bullet.kill();
		}
	},
	playerCrate: function(player, crate){
		this.newCrate();
		var w;
		do{
			w = Weapon.getRandomWeapon();
		} while(w.name == this.currentWeapon.name)

		this.currentWeapon = w;
		document.getElementById("weapon").innerHTML = w.name;
		document.getElementById("score").innerHTML = ++this.score;
		console.log(w.name);
	},
	bulletPlatform: function(bullet, platform){
		if (bullet.properties.bounceCount == 0){
			bullet.kill();
		}
		else {
			bullet.properties.bounceCount--;
		}
	},
	updateEnemy: function(enemy){
		if (enemy.body.velocity.x == 0 /*&& enemy.body.onFloor()*/) {
			enemy.scale.x *= -1;
			enemy.body.velocity.x = enemy.velocity  * enemy.scale.x * enemy.velocityMultiplicator;
			//enemy.animations.play('walk');
		}
	},
	enemyBasement: function(basement, enemy){
		console.log('enemyBasement');
		enemy.velocityMultiplicator = 1.5;
		enemy.body.velocity.x *= -1.5;
		enemy.scale.x *= -1;
		enemy.body.y = 20;
	},
	enemyPlayer: function(enemy, player){
		enemy.damage(1);
		player.damage(1);
	},
	enemyBullet: function(enemy, bullet){
		console.log('enemyBullet');
		if (bullet.properties.piercing != 0){
			if(bullet.properties.enemiesDamaged.indexOf(enemy) == -1){
				enemy.damage(bullet.properties.damage);
				bullet.properties.piercing--;
				bullet.properties.enemiesDamaged.push(enemy); //FIXME Probably if enemy dies and respawn (recycled), wont be hit again
			}
			return;
		}
		enemy.damage(bullet.properties.damage);
		bullet.kill();
	},
	playerBasement: function(player, basement){
		console.log('playerBasement');
		player.damage(99);
	},
	playerDie: function(player){
		console.log('playerDie');
		//TODO add nice particle effects
		//TODO add game over/restart
	},
	enemyDie: function(enemy){
		console.log('enemyDie');
		//TODO add nice particle effects
	},
	bulletDie: function(bullet){
		if (bullet.properties.explosionRadius != 0)	{
			//Boom baby!
		}
		console.log('bulletDie');
		//TODO add nice particle effects
	}
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', game_state.main);  
game.state.start('main');  