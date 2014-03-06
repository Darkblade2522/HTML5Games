var Weapon = function(shootFunction, name, cooldown, damage){
	this.shoot = shootFunction; //Shoot function
	this.cooldown = cooldown || 500;
	this.damage = damage || 1;
	this.name = name;
}

Weapon.weaponsAvailable = [
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				bullet.damage = this.damage;
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -350;
				else
					bullet.body.velocity.x = 350;
			}
		}
	}, "pistol", 300, 1),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;
			var bullet = context.bullets.getFirstExists(false);

			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				bullet.damage = this.damage;
				if (context.facing == Phaser.LEFT)
					bullet.body.velocity.x = -350;
				else
					bullet.body.velocity.x = 350;
			}
		}
	}, "revolver", 400, 2),
	new Weapon(function(context){
		if (context.game.time.now > context.bulletTime) {
			context.bulletTime = game.time.now + this.cooldown;

			var bullet = context.bullets.getFirstExists(false);
			if (bullet) {
				bullet.reset(context.player.center.x, context.player.center.y/*, 1*/);
				bullet.damage = this.damage;
				bullet.body.velocity.x = -350;
			}
			var bullet2 = context.bullets.getFirstExists(false);
			if (bullet2) {
				bullet2.reset(context.player.center.x, context.player.center.y/*, 1*/);
				bullet2.damage = this.damage;
				bullet2.body.velocity.x = 350;
			}
		}
	}, "double pistol", 300, 1)
]

Weapon.getRandomWeapon = function(){
	return this.weaponsAvailable[Math.floor(Math.random() * this.weaponsAvailable.length)];
}

Weapon.getWeapon = function(weaponIndex){
	return this.weaponsAvailable[weaponIndex];
}