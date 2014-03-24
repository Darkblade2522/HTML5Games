var Weapon = function(shootFunction, name, cooldown, damage, bulletVelocity, bounceValue, bounceCount, explosionRadius, piercing, timeToLive) {
	this.shoot = shootFunction; //Shoot function
	this.cooldown = cooldown || 500;
	this.damage = damage || 1;
	this.bulletVelocity = bulletVelocity || 350;
	this.bounceValue = bounceValue || 0;
	this.bounceCount = bounceCount || 0;
	this.explosionRadius = explosionRadius || 0;
	this.piercing = piercing || 0;
	this.timeToLive = timeToLive || 0; //in ms ; 0 = infinite
	this.name = name;
}

Weapon.prototype.addBulletProperties = function(bullet){
	bullet.properties = {
		weaponName 		: this.name,
		damage 			: this.damage,
		piercing 		: this.piercing,
		bounceValue 	: this.bounceValue,
		bounceCount 	: this.bounceCount,
		explosionRadius : this.explosionRadius,
		velocity 		: this.bulletVelocity,
		timeToLive 		: this.timeToLive,
		enemiesDamaged	: [] //Dont damage same enemy twice
	}
	bullet.damage = this.damage;
	bullet.body.allowGravity = false;
	bullet.body.bounce.setTo(this.bounceValue);
}

Weapon.weaponsAvailable = [
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
		}
	}, "pistol", 300, 1),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT) {
					bullet.body.velocity.x = -this.bulletVelocity;
					context.player.body.x += 4; //Recoil
				}
				else {
					bullet.body.velocity.x = this.bulletVelocity;
					context.player.body.x -= 4; //Recoil
				}
				bullet.body.velocity.y = Math.floor(Math.random()*60)-30;
				this.addBulletProperties(bullet);
			}
		}
	}, "machine gun", 100, 1, 450),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT) {
					bullet.body.velocity.x = -this.bulletVelocity;
					context.player.body.x += 4; //Recoil
				}
				else {
					bullet.body.velocity.x = this.bulletVelocity;
					context.player.body.x -= 4; //Recoil
				}
				bullet.body.velocity.y = Math.floor(Math.random()*180)-90;
				this.addBulletProperties(bullet);
			}
		}
	}, "gatling gun", 20, 1, 450),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
		}
	}, "revolver", 400, 3),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			for (var i = 0 ; i< 6; i++){

				var bullet = context.bullets.getFirstExists(false);
				if (bullet) {
					bullet.reset(context.player.body.center.x, context.player.body.center.y);
					if (context.facing == Phaser.LEFT)
						bullet.body.velocity.x = -this.bulletVelocity;
					else
						bullet.body.velocity.x = this.bulletVelocity;
					bullet.body.velocity.x *= Math.random()/2 +0.5;
					bullet.body.velocity.y = Math.floor(Math.random()*70)-35;
					this.addBulletProperties(bullet);
				}
			}
			if (context.facing == Phaser.LEFT)
				context.player.body.x += 4; //Recoil
			else
				context.player.body.x -= 4; //Recoil
		}
	}, "shotgun", 400, 3, 450, 0, 0, 0, 0, 100),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;

			var bullet = context.bullets.getFirstExists(false);
			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				bullet.body.velocity.x = -this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
			var bullet2 = context.bullets.getFirstExists(false);
			if (bullet2) {
				bullet2.reset(context.player.body.center.x, context.player.body.center.y);
				bullet2.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet2);
			}
		}
	}, "double pistol", 300, 1),
	/*new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
		}
	}, "rocket launcher", 600, 10, 600, 0, 0, 250),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
				bullet.body.allowgravity = true;
				//bullet.body.bounce.x = this.bounceValue;
				bullet.body.bounce.y =  0.9;
				bullet.body.bounce.x =  0.9;
			}
		}
	}, "grenade launcher", 600, 10, 200, 0.9, 5, 200),*/
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.body.center.x, context.player.body.center.y);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
		}
	}, "disc launcher", 600, 3, 450, 1, 1, 0, 50)
]

Weapon.getRandomWeapon = function(){
	//return this.weaponsAvailable[Math.floor(Math.random() * this.weaponsAvailable.length)];
	//No pistol
	return this.weaponsAvailable[Math.floor(Math.random() * this.weaponsAvailable.length-1)+1];
}

Weapon.getWeapon = function(weaponIndex){
	return this.weaponsAvailable[weaponIndex];
}