var Weapon = function(shootFunction, cooldown, damage){
	this.shoot = shootFunction; //Shoot function
	this.cooldown = cooldown || 500;
	this.damage = damage || 1;
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
	}, 500, 1)
]

Weapon.getRandomWeapon = function(){
	return this.weaponsAvailable[Math.floor(Math.random() * this.weaponsAvailable.length)];
}

Weapon.getWeapon = function(weaponIndex){
	return this.weaponsAvailable[weaponIndex];
}