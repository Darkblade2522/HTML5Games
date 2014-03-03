
var Enemies = function(){
};

Enemies.enemiesAvailable = [
	function(context){
		var enemy = context.enemies.getFirstExists(false);

	    if (enemy) {
		    enemy.reset(w/2, 50);
		    enemy.scale.setTo(1, 1);
		    enemy.anchor.setTo(0.5, 1);
		    enemy.body.gravity.y = 1000;
		    enemy.body.velocity.x = 150;
		    //enemy.animations.add('walk', [0, 1], 3, true);

		    /*if (context.half == 1) {
		    	enemy.scale.setTo(-1, 1);
		    	context.half = 0;
		    }
		    else
		    	context.half = 1;
			}*/
		}
	}
];

Enemies.getRandomEnemy = function(){
	return this.enemiesAvailable[Math.floor(Math.random() * this.enemiesAvailable.length)];
}