window.onload = function(){
	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");

	document.addEventListener("keydown", keyPush);
	setInterval(game, 1000 / 30);

	px = py = 10; // player x, y
	gs = tc = 20; // grid size, tile count
	ax = ay = 15; // apple x, y
	xv = yv = 0; // velocity x, y
	trail = [];
	tail = 5;

	function game(){
		px += xv;
		py += yv;

		if(px < 0){
			px = tc - 1;
		}
		if(px > tc - 1){
			px = 0;
		}
		if(py < 0){
			py = tc - 1;
		}
		if(py > tc - 1){
			py = 0;
		}

		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "lime";
		for(var i = 0; i < trail.length; i++){
			ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
			if(trail[i].x == px && trail[i].y == py){
				tail = 5;
			}
		}
		trail.push({x: px, y: py});
		while(trail.length > tail){
			trail.shift();
		}

		if(ax == px && ay == py){
			tail++;
			ax = Math.floor(Math.random() * tc);
			ay = Math.floor(Math.random() * tc);
		}

		ctx.fillStyle = "#ff0000";
		ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
	}

	function keyPush(e){
		switch(e.keyCode){
			case 37:
				if(xv !== 1)
					xv = -1;
				yv = 0;
				break;
			case 38: 
				xv = 0;
				if(yv !== 1)
					yv = -1;
				break;
			case 39:
				if(xv !== -1)
					xv = 1;
				yv = 0;
				break;
			case 40: 
				xv = 0;
				if(yv !== -1)
					yv = 1;
				break;
		}
	}
}