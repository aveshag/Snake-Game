function init()
{

	canvas = document.getElementById("board")
	
	// size of snake board
	W = canvas.width = 500
	H = canvas.height = 500

	// getting 2d context of snake board for drawing objects on it
	pen = canvas.getContext('2d')

	// size of a cell in board
	cell_size = 33.5;


	gameover = false
	score = 0

	food_img = new Image();
	food_img.src = "apple.png"
	trophy_img = new Image();
	trophy_img.src = "trophy.png"

	// getting location of food
	food = getRandomFood();

	// snake object
	snake =
	{
		init_len:5,
		color:"green",
		cells:[],
		direction:"right",

		// for creating snake first time
		createSnake:function()
		{
			for(var i = this.init_len;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},

		// draw snake on canvas
		drawSnake:function()
		{
			for(var i = 0;i<this.cells.length;i++)
			{
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*cell_size,cell_size-0.5,cell_size-0.5);
			}
		},

		// move snake, update score and check for Game over
		updateSnake:function()
		{
			var headx = this.cells[0].x;
			var heady = this.cells[0].y;

			// update score and increase length of snake by one block
			if(headx == food.x && heady== food.y)
			{
				food = getRandomFood();
				score += 2;
			}
			else
			{
				this.cells.pop();
			}

			// change direction of snake on player's response
			var X,Y;
			if(this.direction == "right")
			{
				X = headx + 1;
				Y = heady;
			}
			else if(this.direction == "left")
			{
				X = headx - 1;
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

			var lastx = Math.round(W/cell_size);
			var lasty = Math.round(H/cell_size);

			// Game over: if snake eat itself
			for(let i = 1;i<this.cells.length;i++)
			{
				if(this.cells[0].x === this.cells[i].x && this.cells[0].y === this.cells[i].y)
				{
					gameover = true;
					break;
				}
			}

			// Game over: if snake hit boundary
			if(this.cells[0].x < 0 || this.cells[0].y < 0  || this.cells[0].x + 1 > lastx || this.cells[0].y + 1 > lasty  )
			{
				gameover = true;
			}

		}
	};

	snake.createSnake();

	// action based on player's response
	function action(e)
	{
		var cur_dir = snake.direction
		if((cur_dir==="up" || cur_dir==="down") && e.key==="ArrowRight" ){
			snake.direction = "right";
		}
		else if((cur_dir==="up" || cur_dir==="down") && e.key==="ArrowLeft"){
			snake.direction = "left";
		}
		else if((cur_dir==="right" || cur_dir==="left") && e.key==="ArrowUp"){
			snake.direction = "up";
		}
		else if((cur_dir==="right" || cur_dir==="left") && e.key==="ArrowDown"){
			snake.direction = "down";
		}
	}
	document.addEventListener('keydown', action);
}


// draw food, snake and display score
function draw()
{
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle = "red"

	// pen.fillRect(food.x*cell_size,food.y*cell_size,cell_size,cell_size)

	pen.drawImage(food_img,food.x*cell_size,food.y*cell_size,cell_size-2,cell_size-2)
	pen.drawImage(trophy_img, 10,10, cell_size,cell_size)
	pen.fillStyle = "black"
	pen.font = "13px Roboto"
	pen.fillText(score, 21, 26)

}

function update()
{
	
	snake.updateSnake();
}
 
// generate random location for food
function getRandomFood()
{

	var foodx = Math.round(Math.random()*(W-cell_size)/cell_size);
	var foody = Math.round(Math.random()*(H-cell_size)/cell_size);

	var food={
		x:foodx,
		y:foody,
		color:"red",
	}
	return food;
}

// game loop
function gameLoop()
{
	draw()
	update()
	if(gameover)
	{
		clearInterval(f)
		alert("Game Over!")
	}
}

init()

f = setInterval(gameLoop, 380) // time in milliseconds
