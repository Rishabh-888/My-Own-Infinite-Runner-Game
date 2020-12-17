//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Declaration of global variables
var monkey, monkeyImg;
var back, backImg;
var banana, bananaImg, bananaGroup;
var obstacle, obstacleImg, obstacleGroup;
var score = 0;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){
  
 backImg = loadImage("jungle.jpg");
  
  monkeyImg =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImg = loadImage("stone.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.jpg");
}

function setup() {
 createCanvas(550, 450);
  
  back = createSprite(270, 250, 50, 50);
  back.addImage("background", backImg);
  back.velocityY = 1.5;
  
  monkey = createSprite(100, 225, 20, 20);
  monkey.addAnimation("monkey", monkeyImg);
  monkey.scale = 0.2;
  
  gameOver = createSprite(285, 190, 20, 20);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(285, 230, 20, 20);
  restart.addImage(restartImg);
  restart.scale = 0.12;
  
  gameOver.visible = false;
  restart.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background("#DC143C");
  
  if(gameState===PLAY){
    
   //Scoring system
   if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
   score=score+2;
   }
    
    if(keyDown("up_arrow")){
      monkey.y = monkey.y-3;
    }
    
    if(keyDown("down_arrow")){
      monkey.y = monkey.y+3;
    }
    
    if(keyDown("left_arrow")){
      monkey.x = monkey.x-3;
    }
    
    if(keyDown("right_arrow")){
      monkey.x = monkey.x+3;
    }
    
    if(back.y>300){
       back.y =100;
     }
    
    spawnObstacles();
    spawnFood();
    
    if(obstacleGroup.isTouching(monkey)||monkey.y>500){
       reset();
       obstacleGroup.destroyEach();
       bananaGroup.destroyEach();
       gameState = END;
    }
    
  }
   if(gameState===END){
     
    gameOver.visible = true;
    restart.visible = true;
     
    //set velcity of each game object to 0
    background.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {
      reset();
      touches = []
    }
   }
  
  drawSprites();
  
  //displaying score             
 stroke("#FF1493");
 textSize(18);
 textFont("Arial Black");
 fill("#FF1493");
 text("Your Score : "+score,200,35);
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(400,350,10,40);
    obstacle.velocityX = -10;
    obstacle.y = Math.round(random(25, 400));
    obstacle.scale = 0.12;
    obstacle.addImage(obstacleImg)
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
}

function spawnFood(){
  //code to spawn the foods
  if (frameCount % 80 === 0){
    var banana = createSprite(600,165,10,40);
    banana.y = Math.round(random(25, 400));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -10;
   
    //assign lifetime to the variable
    banana.lifetime = 130;
    
    bananaGroup.add(banana);
  }
}

function reset(){
  gameState = PLAY;
  monkey.x = 100;
  monkey.y = 225;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  }