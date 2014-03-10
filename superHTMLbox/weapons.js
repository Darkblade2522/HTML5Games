var Weapon = function(shootFunction, name, cooldown, damage, bulletVelocity, bounceValue, bounceCount, explosionRadius, piercing){
	this.shoot = shootFunction; //Shoot function
	this.cooldown = cooldown || 500;
	this.damage = damage || 1;
	this.bulletVelocity = bulletVelocity || 350;
	this.bounceValue = bounceValue || 0;
	this.bounceCount = bounceCount || 0;
	this.explosionRadius = explosionRadius || 0;
	this.piercing = piercing || 0;
	this.name = name;
}

Weapon.prototype.addBulletProperties = function(bullet){
	bullet.properties = {
		piercing = this.piercing;
		bounceValue = this.bounceValue;
		bounceCount = this.bounceCount;
		explosionRadius = this.explosionRadius;
		damage = this.damage;
		velocity = this.bulletVelocity;
	}
}

Weapon.weaponsAvailable = [
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
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
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				bullet.body.velocity.y = Math.floor(Math.random()*40)-20;
				this.addBulletProperties(bullet);
			}
		}
	}, "machine gun", 100, 1, 450),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
		}
	}, "revolver", 400, 2),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;

			var bullet = context.bullets.getFirstExists(false);
			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				bullet.body.velocity.x = -this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
			var bullet2 = context.bullets.getFirstExists(false);
			if (bullet2) {
				bullet2.reset(context.player.center.x, context.player.center.y/*, 1*/);
				bullet2.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet2);
			}
		}
	}, "double pistol", 300, 1),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -this.bulletVelocity;
				else
					bullet.body.velocity.x = this.bulletVelocity;
				this.addBulletProperties(bullet);
			}
		}
	}, "rocket launcher", 600, 10),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
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
	return this.weaponsAvailable[Math.floor(Math.random() * this.weaponsAvailable.length)];
}

Weapon.getWeapon = function(weaponIndex){
	return this.weaponsAvailable[weaponIndex];
}