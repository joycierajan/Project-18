var banana, bananaImage, obstacleImage;
var obstacleGroup;
var bananaGroup;
var obstaclesGroup;
var back, backImage;
var score;
var score = 0;
var invisibleGround;
var monkey, monkey_running;
var PLAY = 1
var END = 0
var gameState = PLAY;
var gameOver;
var retry;
var MonkeyImage1, MonkeyImage2, MonkeyImage3, MonkeyImage4, MonkeyImage5, MonkeyImage6, MonkeyImage7, MonkeyImage8, MonkeyImage9, MonkeyImage10;


function preload() {
  backImage = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");


}

function setup() {
  createCanvas(400, 400);
  back = createSprite(200, 200, 400, 10);
  back.addImage(backImage);
  back.x = back.width / 2;

  invisibleGround = createSprite(200, 345, 400, 10);
  invisibleGround.visible = false;

  monkey = createSprite(50, 200, 20, 200);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.5;

  obstaclesGroup = new Group();
    bananaGroup = createGroup();
   

}

function draw() {
  background(220);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  obstacles();
  bananas()

  monkey.collide(invisibleGround);

  if (gameState === PLAY) {
    score = Math.round(frameCount / 4);

    if (back.x < 0) {
      back.x = back.width / 2
    }

    if (obstaclesGroup.isTouching(monkey)) {
      monkey.scale = 0.2;
      bananaGroup.destroyEach();
    }
    if (bananaGroup.isTouching(monkey)) {
      score = +2
      bananaGroup.destroyEach();
    }
  }




}

function obstacles() {

  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 330, 10, 10);
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 100;

    var score = Math.round(random(1, 4));

    switch (score) {
      case 10:
        obstacle.scale = 0.12;
        break;
      case 20:
        obstacle.scale = 0.14;
        break;
      case 30:
        obstacle.scale = 0.16;
        break;
      case 40:
        obstacle.scale = 0.18;
        break;
      default:
        break;
    }
    obstaclesGroup.add(obstacle);
  }
}

function bananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(400, 230, 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.08;
    bananaGroup.add(banana);
  }
}

function restart() {
  gameState = PLAY;
  gameOver.visible = false;
  retry.visible = false;

}