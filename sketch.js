var Balloon, database;
var position;
var backgroundimg,background1
var balloonanimation
function preload(){
  backgroundimg=loadImage("Hot air Ballon-01.png")
  balloonanimation=loadAnimation("Hot air Ballon-02.png,Hot air Ballon-03.png,Hot air Ballon-04.png")
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  Balloon = createSprite(250,250,10,10);
  Balloon.addAnimation("balloonanimation")
  background1=createSprite(250,100,10,10)
  background1=addImage("backgroundimg")

  var Balloon = database.ref('balloon/position');
  Balloon.on("value", readPosition, showError);
}

function draw(){
  background("white");
  createCanvas(500,500)

  back

    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  Balloon.x = position.x;
  Balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
