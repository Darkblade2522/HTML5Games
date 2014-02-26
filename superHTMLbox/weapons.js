var Weapon = function(shootFunction){
	this.shoot = shootFunction; //Shoot function
}

Weapon.weaponsAvailable = [
	new Weapon(function(context){
		var bullet = context.bullets.getFirstExists(false);

		if (bullet) {
			console.log(context.player.body.facing);
			bullet.reset(context.player.center.x, context.player.center.y);
			if (context.facing == Phaser.LEFT)
				bullet.body.velocity.x = -350;
			else
				bullet.body.velocity.x = 350;
		}
	})
]

Weapon.getRandomWeapon = function(){
	return this.weaponsAvailable[Math.floor(Math.random() * weaponsAvailable.length)];
}

Weapon.getWeapon = function(weaponIndex){
	return this.weaponsAvailable[weaponIndex];
}