var database;
var dog, happy_dog;
var dog_image, happy_dog_image;
var foods = 20; 
var foodStock;



function preload() {
    dog_image = loadImage("Dog.png");
    happy_dog_image = loadImage("happydog.png");
}


function setup(){
  database = firebase.database();
  createCanvas(500,500);

  dog = createSprite(250, 400, 20, 20);
  dog.addImage(dog_image);
  dog.scale = 0.2;
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

}

function draw(){
  background("green");
  

  if (keyWentDown(UP_ARROW)) {
    writeStock(foods);
    dog.addImage(happy_dog_image);
  }

  if (keyDown(DOWN_ARROW)) {
    dog.addImage(dog_image);
  }



  stroke("white");
  fill("white");
  text("press up arrow key to feed", 10, 10);
  text("press down arrow key to feed", 10, 40);
  text("food remaining: " + foods, 10, 100)

  drawSprites();
  
}

function readStock(data) {
  foods = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    food: x
  })
}

