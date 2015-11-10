window.addEventListener('load', function(){
//var x = 20;
//var y = 10;
//var w = 20;
//var h = 10;

//var speed = 2;
//var ySpeed = 1;
var level = 1;
var canvas = document.getElementById("myCanvas");
var ctx =canvas.getContext("2d");
var GAME_WIDTH = 640;
var GAME_HEIGHT = 360;
var gameAlive = true;
    var sprites= {};
var enemies = [
    {x:100,
    y: 100,
    speedY: 1,
    w: 30,
    h: 30},
    {x:200,
    y: 200,
    speedY: 1,
    w: 30,
    h: 30},
    {x:300,
    y: 100,
    speedY: 2,
    w: 30,
    h: 30},
    {x:400,
    y: 100,
    speedY: 3,
    w: 30,
    h: 30}
];

var player = {x:10,
    y: 160,
    speedX: 2,
    w: 30,
    h: 30,
    isMoving: false         
    };

var goal = {x:550   ,
    y: 160,    
    w: 30,
    h: 30,                
    };

var movePlayer = function(){
    player.isMoving = true;
};

var stopPlayer = function(){
    player.isMoving = false;
};

    var reload = function(){
        player.x = 10;
        player.y = 160;     
        player.speedX = player.speedX +1;
        player.isMoving = false;
    };
    
canvas.addEventListener('mousedown',movePlayer);
canvas.addEventListener('mouseup',stopPlayer);
canvas.addEventListener('touchstart',movePlayer);
canvas.addEventListener('touchend',stopPlayer);    
    
var update = function(){
    
if(checkCollision(player,goal)){
    //gameAlive = false;              
    alert('Next Level !!');
    //window.location = "";                
    
    enemies.forEach(function(element,index){
        if (element.speedY > 0){
        element.speedY += 1;
        }
        else{
        element.speedY += -1;
        }
    });
    if (level ==5){
        gameAlive = false;              
        alert('You Won !!');
        window.location = "";               
    }
    level += 1;
    reload();
}
        if(player.isMoving){
            player.x += player.speedX;
        }
        enemies.forEach(function(element,index){
        
        if(checkCollision(player,element)){
            gameAlive = false;
            alert('Game Over!!');
            window.location = "";
        }
                
        element.y += element.speedY;
        
        if (element.y <= 10){
            element.y = 10;
            element.speedY *= -1;
            }
        else if(element.y >= GAME_HEIGHT-50){
            element.y = GAME_HEIGHT - 60;
            element.speedY *= -1;
        }
    });
    
};

var load = function(){
    sprites.player = new Image();
    sprites.player.src = "images/hero.png";
    
    sprites.background = new Image();
    sprites.background.src = "images/floor.png";
    
    sprites.enemy = new Image();
    sprites.enemy.src = "images/enemy.png";
    
    sprites.goal = new Image();
    sprites.goal.src = "images/chest.png";
};

var draw = function(){
    ctx.drawImage(sprites.background,0,0);    
    ctx.drawImage(sprites.player,player.x,player.y);    
    enemies.forEach(function(element,index){
           ctx.drawImage(sprites.enemy,element.x,element.y);
    });
    
    ctx.drawImage(sprites.goal,goal.x,goal.y);

};

var checkCollision = function(rect1,rect2){
    var closeOnWidth = Math.abs(rect1.x-rect2.x) <= Math.max(rect1.w,rect2.w);
    var closeOnHeight = Math.abs(rect1.y-rect2.y) <= Math.max(rect1.h,rect2.h);    
    return closeOnWidth && closeOnHeight;
};
    
var step = function(){  
    update();
    draw();
    if(gameAlive){
        window.requestAnimationFrame(step);
    }
};

load();
step();
});