
var Enemies = function(){
};

Enemies.enemiesAvailable = [
	function(context){
		console.log("createEnemy");
		var enemy = context.enemies.getFirstExists(false);

	    if (enemy) {
			console.log("createEnemy2");
		    enemy.reset(40, 50);
		    enemy.scale.setTo(1, 1);
		    enemy.anchor.setTo(0.5, 1);
		    enemy.body.gravity.y = 1000 * gravityMultiplier;
	    	enemy.body.velocity.x = 150;
	    	enemy.health = 1;

		    /*if (Math.random() < 0.5 ) {
		    	enemy.body.velocity.x = -150;
		    	enemy.body.x = w - 20;
		    	enemy.scale.setTo(-1, 1);
		    }*/
		    //enemy.animations.add('walk', [0, 1], 3, true);
		}
	}
];

Enemies.getRandomEnemy = function(){
	return this.enemiesAvailable[Math.floor(Math.random() * this.enemiesAvailable.length)];
}