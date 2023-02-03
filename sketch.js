const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
var engine,world;

var boardImg,gunImg;
var gun,board;
var bullets = [];
var score = 0;

function preload(){
  boardImg = loadImage("./assets/board.png");
  gunImg = loadImage("./assets/gun.jpg");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  
  //console.log(bullet);

  var gun_options = {
    isStatic:true
  }
  gun = Bodies.rectangle(width/6,200,120,30,gun_options);
  World.add(world,gun);

  board = Bodies.rectangle(width-50,200,50,60,gun_options);
  World.add(world,board);
}

function draw(){
  background(rgb(255,159,0));

  textSize(40);
  text("Score: "+score,width - 200, 50);
  textAlign(CENTER,CENTER);

  Engine.update(engine);

  //console.log(mouseY);
  Matter.Body.setPosition(gun,{x:width/6,y:mouseY})

  if(frameCount%100 === 0){
    Matter.Body.setPosition(board,{x:width-50,y:random(0,height)})
  }

  push();
  imageMode(CENTER);
  image(gunImg,gun.position.x,gun.position.y,120,30);
  image(boardImg,board.position.x,board.position.y,50,60);
  pop();
  
  for(var i=0;i<bullets.length;i++){
    if(bullets[i]){
      bullets[i].display();
      collisionWithBoard(bullets[i]);
    }
  }
}

function keyPressed(){
  if(keyCode === 32){
    var bullet = new Bullet(gun.position.x,gun.position.y);
    bullets.push(bullet);
    //console.log("hello");
  }
}

function keyReleased(){
  if(keyCode === 32){
    bullets[bullets.length-1].shoot();
  }
}

function collisionWithBoard(bullet){
  var collision = Matter.SAT.collides(bullet.body,board);
  if(collision.collided){
    score += 1;
    bullets[i].remove(i);
  }
}