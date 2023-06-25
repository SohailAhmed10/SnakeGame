var c = document.getElementById("myCanvas");
var snake_ctx = c.getContext("2d");
var key;
// learned snake body from https://www.educative.io/blog/javascript-snake-game-tutorial
var snake = [{x:100, y:100, width:10,height:10}, {x:90, y:100, width:10,height:10}, {x:80, y:100, width:10,height:10}, {x:70, y:100, width:10,height:10}, {x:60, y:100, width:10,height:10}];

var food = {
    x:0,
    y:0,
    width: 10,
    height:10
}

var points=0;
function snakeMove() {
    if (key == 119) {
        if (snake[0].y > 0) {
            clearSnake();
            snakeBodyMove();
            snake[0].y = snake[0].y - 10;
            snakeOnCanvas();
            var isColliding = detectCollision();
            if (isColliding) {
                foodCollision();
                
            }
        }
        else {
            hitBorder();
        }
    }
    else if (key == 115) {
        if (snake[0].y < 440) {
            clearSnake();
            snakeBodyMove();
            snake[0].y = snake[0].y + 10;
            snakeOnCanvas();
            var isColliding = detectCollision();
            if (isColliding) {
                
                foodCollision();
            }
        }
        else {
            hitBorder();
        }
    } 

    else if (key == 97) {
        if (snake[0].x > 0) {
            clearSnake();
            snakeBodyMove();
            snake[0].x = snake[0].x - 10;
            snakeOnCanvas();
            var isColliding = detectCollision();;
            if (isColliding) {
                foodCollision();
            }
        }
        else {
            hitBorder()
        }
    }
    
    else if (key == 100) {
        if (snake[0].x < 690) {
            clearSnake();
            snakeBodyMove();
            snake[0].x = snake[0].x + 10;
            snakeOnCanvas();
            var isColliding = detectCollision();
            if (isColliding) {
                foodCollision();
            }
        }
        else {
            hitBorder();
        }
    }

}
function foodOnCanvas() {
    food.x = Math.round((Math.random()*(600-0)+0)/5)*5;
    food.y = Math.round((Math.random()*(400-0)+0)/5)*5;
    snake_ctx.fillStyle = "#FF0000";

    snake_ctx.fillRect(food.x, food.y, food.width, food.height);
}
foodOnCanvas();

for (var i = 0; i < snake.length; i++) {
    snake_ctx.fillStyle= "green";
    snake_ctx.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);

}
$("body").on("keypress", function (event) {
    
    key = (event.keyCodes ? event.keyCode : event.which);
    setInterval(snakeMove, 700);
}) 

function hitBorder() {
    $("#title").text("Game Over! Refresh to Restart");
    $("#title").css("color", "red");
    snake_ctx.clearRect(0, 0, c.width, c.height);
}

function foodCollision() {
    snake_ctx.clearRect(food.x, food.y, food.width, food.height);
    snake.push({x:snake[snake.length-1].x - 10, y:snake[snake.length-1].y, width:10,height:10});
    points = points + 100;
    $("#points").text("Points: " + points.toString());
    foodOnCanvas();
}

function detectCollision() {
    // learned collision detection from https://yonatankra.com/how-to-write-a-simple-collision-detector-in-html5-canvas-and-javascript/
    var snakeRight = snake[0].x + snake[0].width;
    var foodRight = food.x + food.width;
    var snakeBottom = snake[0].y + snake[0].height;
    var foodBottom = food.y + food.height;
          
    return ((snake[0].x <= foodRight && snake[0].x >= food.x) || (snakeRight <= foodRight && snakeRight >= food.x)) 
    && ((snake[0].y <= foodBottom && snake[0].y >= food.y) || (snakeBottom <= foodBottom && snakeBottom >= food.y));
}

function clearSnake() {
    for (var i = 0; i < snake.length; i++) {
        snake_ctx.clearRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
    
    }
}

function snakeOnCanvas() {
    for (var i = 0; i < snake.length; i++) {
        snake_ctx.fillStyle= "green";
        snake_ctx.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
    
    }
}

function snakeBodyMove() {
    for (var i = 0; i < snake.length-1; i++) {
        var val = i + 1;
        window['temporaryx' + val] = + snake[i].x;
        window['temporaryy' + val] = + snake[i].y;
        
    }
    for (var i = 0; i < snake.length-1; i++) {
        var b = i + 1;
        snake[b].x = eval('temporaryx' + b); 
        snake[b].y = eval('temporaryy' + b);
    }
}