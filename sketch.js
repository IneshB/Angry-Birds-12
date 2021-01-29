const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bgImg;
var bg;
var score;

function preload() {
    bgImg = loadImage("sprites/bg.png");
    getBackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(width-350,height-80,80,80);
    box2 = new Box(width-150,height-80,80,80);
    pig1 = new Pig(width-250, height-90);
    log1 = new Log(width-250,height-120,280, PI/2);

    box3 = new Box(width-350,height-125,80,80);
    box4 = new Box(width-150,height-125,80,80);
    pig3 = new Pig(width-250, height-125);
    log3 =  new Log(width-250,height-225,280, PI/2);

    box5 = new Box(width-250,height-250,80,80);
    log4 = new Log(width-320,height-250,150, PI/7);
    log5 = new Log(width-180,height-250,150, -PI/6);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    score = 0;
}

function draw(){
    if (backgroundImg){
        background(backgroundImg);
    }
    else {
        background(bgImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("Score: " + score, width - 300, 50);

    Engine.update(engine);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1 && gameState === "launched"){
        bird.trajectory = [];
        World.remove(world, bird.body);
        bird = new Bird(200,50);
        slingshot.attach(bird.body);
        gameState = "onSling";
    }
}

async function getBackgroundImage(){
    var response = await fetch("//worldclockapi.com/api/json/est/now");
    var responseJson = await response.json();
    var datetime = responseJson.currentDateTime;
    var hour = datetime.slice(11,13);

    if (hour >= 6 && hour <= 18){
        bg = "sprites/bg.png";
    }
    else {
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}