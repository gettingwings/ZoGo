var database, gameState = 0, game, form, player;
var playerCount = 0, allPlayers;
var bgImg, player1Img, player2Img;
var bg, vel = 0;
var player1, player2, players;
var z1Img, z2Img, z3Img, zombieGroup;

function preload(){
  bgImg = loadImage("./images/bg.jpg");
  player1Img = loadAnimation("./images/p10.png","./images/p11.png","./images/p12.png","./images/p13.png","./images/p14.png")
  player2Img = loadAnimation("./images/p20.png","./images/p21.png","./images/p22.png","./images/p23.png","./images/p24.png","./images/p25.png")
  z1Img = loadAnimation("./z1/tile0.png","./z1/tile1.png","./z1/tile2.png","./z1/tile3.png","./z1/tile4.png","./z1/tile5.png");
  z2Img = loadAnimation("./z2/tile0.png","./z2/tile1.png","./z2/tile2.png","./z2/tile3.png","./z2/tile4.png");
  z3Img = loadAnimation("./z3/tile0.png","./z3/tile1.png","./z3/tile2.png","./z3/tile3.png","./z3/tile4.png","./z3/tile5.png","./z3/tile6.png","./z3/tile7.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  zombieGroup = new Group();
}

function draw(){
  background(bgImg);
  
    if(playerCount == 2){
      game.updateState(1)
    }
    
    if(gameState == 1){
      game.play()
    }
  
  
}