var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
//creating ghost sprite
  ghost=createSprite(300,300)
  ghost.addImage(ghostImg);
  ghost.scale=0.3

  //creating groups
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  //spookySound.loop();
  boundry1=createSprite(50,0,10,1200)
  boundry1.visible=false;
  boundry2=createSprite(530,0,10,1200)
  boundry2.visible=false;
}

function draw() {
  background(200);
  
if(gameState==="play"){
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
    //ghost jumping mechanics
  if (keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3;
  }
  
  if (keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  
    ghost.velocityY+=0.8
  
    if(tower.y > 400){
        tower.y = 300
      }
      spawnDoors();
    
      if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
        ghost.destroy();
        gameState="end";

      }
    }
ghost.collide(boundry1)
ghost.collide(boundry2)

    drawSprites();

    if(gameState==="end"){
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over",230,250);
    }


}

//creating doors
function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    door.addImage(doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;

    //creating climbers
    var climber=createSprite(200,10)
    climber.addImage(climberImg)
    climber.x=door.x;
    climber.velocityY=1;

    //creating invisible thingimabobs
    invisibleBlock=createSprite(200,20);
    invisibleBlock.debug=true;
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.visible=false;


    //adding depth
    door.depth=1;
    climber.depth=2;
    ghost.depth=3;

    //adding Groups
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    //adding lifetimes
    door.lifetime=800
    climber.lifetime=800
    invisibleBlock.lifetime=800


  }
}


