
var Enemies = function(){
};

//TODO set enemy properties as a "properties" subobject
Enemies.enemiesAvailable = [
	/*function(context){
		console.log("Create a group of 1-3 small enemies");
		var random = Math.random();
		for (var i = 0, numberEnemies = Math.floor(Math.random() *3); i<= numberEnemies; i++){
			var enemy = context.smallEnemies.getFirstExists(false);

			if (enemy) {
				enemy.velocity = 150;
				enemy.velocityMultiplicator = 1;
				if (Math.random() < 0.5 ) {
					enemy.reset(w-100 + i*40, -50);
					enemy.body.velocity.x = -enemy.velocity ;
					enemy.scale.setTo(-1, 1);
				}
				else
				{
					enemy.reset(100 - i*40, -50);
					enemy.body.velocity.x = enemy.velocity ;
					enemy.scale.setTo(1, 1);
				}
				enemy.anchor.setTo(0.5, 1);
				enemy.body.gravity.y = 1000 * gravityMultiplier;
				enemy.health = 1;
				//enemy.animations.add('walk', [0, 1], 3, true);
			}
		}
	},
	function(context){
		console.log("Create a big enemy");
		var enemy = context.bigEnemies.getFirstExists(false);

		if (enemy) {
			enemy.velocity = 150;
			enemy.velocityMultiplicator = 1;
			if (Math.random() < 0.5 ) {
				enemy.reset(w-100, -50);
				enemy.body.velocity.x = -enemy.velocity ;
				enemy.scale.setTo(-1, 1);
			}
			else
			{
				enemy.reset(100, -50);
				enemy.body.velocity.x = enemy.velocity ;
				enemy.scale.setTo(1, 1);
			}
			enemy.anchor.setTo(0.5, 1);
			enemy.body.gravity.y = 1000 * gravityMultiplier;
			enemy.health = 5;
			//enemy.animations.add('walk', [0, 1], 3, true);
		}
	},*/
	function(context){
		console.log("Create a random enemies (debug)");
		var random = Math.random();
		for (var i = 0, numberEnemies = Math.floor(Math.random() *3); i<= numberEnemies; i++){
			var enemy = context.enemies.getFirstExists(false);

			if (enemy) {
				enemy.velocity = 150;
				enemy.velocityMultiplicator = 1;
				if (Math.random() < 0.5 ) {
					enemy.reset(w-100 + i*40, -50);
					enemy.body.velocity.x = -enemy.velocity ;
					enemy.scale.setTo(-1, 1);
				}
				else
				{
					enemy.reset(100 - i*40, -50);
					enemy.body.velocity.x = enemy.velocity ;
					enemy.scale.setTo(1, 1);
				}
				//enemy.anchor.setTo(01, 0.5);
				enemy.body.gravity.y = 1000 * gravityMultiplier;
				enemy.health = 1;
				//enemy.animations.add('walk', [0, 1], 3, true);
			}
		}
	}
];

Enemies.getRandomEnemy = function(){
	return this.enemiesAvailable[Math.floor(Math.random() * this.enemiesAvailable.length)];
}