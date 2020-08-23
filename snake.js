function init()
{
	canvas = document.getElementById("board")
	W = canvas.width = 1000
	H = canvas.height = 1000

	pen = canvas.getContext('2d')
	cs = 67;

	gameover = false
	score =0

	food_img = new Image();
	food_img.src = "apple.png"
	trophy = new Image();
	trophy.src = "trophy.png"

	food = getRandomFood();
	snake={
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function()
		{
			for(var i = this.init_len;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function()
		{
			for(var i = 0;i<this.cells.length;i++)
			{
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},
		updateSnake:function()
		{
			


			
			var headx = this.cells[0].x;
			var heady = this.cells[0].y;

			if(headx == food.x && heady== food.y)
			{
				console.log("food eaten");
				food = getRandomFood();
				score++;
			}
			else
			{
				this.cells.pop();
			}

			
			var X,Y;
			if(this.direction == "right")
			{
				X = headx+1;
				Y = heady;
			}
			else if(this.direction == "left")
			{
				X = headx -1;
				Y = heady;
			}
			else if(this.direction == "up")
			{
				X = headx;
				Y = heady - 1;
			}
			else if(this.direction == "down")
			{
				X = headx;
				Y = heady + 1;
			} 
			
			this.cells.unshift({x:X, y:Y});

			var lastx = Math.round(W/cs);
			var lasty = Math.round(H/cs);

			if(this.cells[0].x < 0 || this.cells[0].y < 0  || this.cells[0].x > lastx || this.cells[0].y > lasty  )
			{
				gameover = true;
			}

		}
	};

	snake.createSnake();
	function action(e)
	{
		if(e.key==="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key==="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key==="ArrowUp"){
			snake.direction = "up";
		}
		else if(e.key==="ArrowDown"){
			snake.direction = "down";
		}
	}
	document.addEventListener('keydown', action);
}

function draw()
{
	pen.clearRect(0,0,W,H);
	snake.drawSnake()
	pen.fillStyle = "red"
	// pen.fillRect(food.x*cs,food.y*cs,cs,cs)
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs)
	pen.drawImage(trophy, 27,15, cs,cs)
	pen.fillStyle = "black"
	pen.font = "30px Roboto"
	pen.fillText(score, 50, 50)

}

function update()
{
	
	snake.updateSnake();
}

function getRandomFood()
{

	var foodx = Math.round(Math.random()*(W-cs)/cs);
	var foody = Math.round(Math.random()*(H-cs)/cs);

	var food={
		x:foodx,
		y:foody,
		color:"red",
	}
	return food;
}
function gameLoop()
{
	if(gameover)
	{
		clearInterval(f)
		alert("Game Over!")
	}
	draw()
	update()
}
init()
f = setInterval(gameLoop, 100)

