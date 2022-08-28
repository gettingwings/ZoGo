class Game{
    constructor(){
        this.resetButton = createButton("Reset");
        this.resetButton.class("resetButton");
        this.resetButton.position(width-100,60);
         
    }

    getState(){
        database.ref("gameState").on("value",function(data){
            gameState = data.val()
        })
    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }

    start(){

         player = new Player();
         player.getCount();

         form = new Form();
         form.display();

         bg = createSprite(width/2, height/2-50);
         bg.addImage(bgImg);

         player1 = createSprite(50,height/2-75);
         player1.addAnimation("p1running",player1Img);
         player2 = createSprite(50,height/2+75);
         player2.addAnimation("p2running",player2Img);
         
         players = [player1, player2];// array of sprite
    }

    play(){
         drawSprites();
         form.hide();
        
         player.getAllPlayers();// object
         fill("white")
         text("life: "+player.life,width/2,20);
         text("potion: "+player.potion,width/2,50);
        
         if (allPlayers !== undefined){
            var index = 1;
            //value of plr: player1 , player2
            for(var plr in allPlayers){
                var x = allPlayers[plr].x;
                var y = allPlayers[plr].y;

                players[index-1].x = x;
                players[index-1].y = y;
                player.move = allPlayers[plr].move;

                if(index == player.index){
                    stroke("white")
                    noFill();
                    ellipse(x-7,y+45,40,10);

                    //camera.position.x = players[index-1].x

                    if(player.move == true){  
                        players[player.index-1].play();
                    }else{
                        players[player.index-1].pause();
                    }
                }
                index += 1;     
            }

            if(player.life<=0){
                gameState = 2
                this.gameEnd();
            }

            this.playerMovement();
            this.spawnZombies();
            this.spawnPotion()
            this.checkCollision();
            this.reset();
            
        }
    }

    playerMovement(){
       if( keyIsDown(UP_ARROW)){
            player.move = true
            player.y -= 5;
            player.updatePlayer()
        }
        if( keyIsDown(DOWN_ARROW)){
            player.move = true
            player.y += 5;
            player.updatePlayer()
        }
        if( keyIsDown(LEFT_ARROW)){
            player.move = true
            player.x -= 5;
            //player.mirrorX(player.mirrorX() * -1);
            players[player.index-1].mirrorX(-1);
            player.updatePlayer()
        }
        if( keyIsDown(RIGHT_ARROW)){
            player.move = true
            player.x += 5;
            players[player.index-1].mirrorX(1);
            player.updatePlayer()
        }
        if( keyWentUp(UP_ARROW)||keyWentUp(DOWN_ARROW)|| keyWentUp(RIGHT_ARROW)||keyWentUp(LEFT_ARROW)){
            player.move = false
            player.updatePlayer()
        }
    }

    reset() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            gameState: 0,
            playerCount: 0,
            players: {},
          });
          window.location.reload();
        });
    }

    spawnZombies(){
        if(frameCount% random([300,400,500,600]) == 0){
            var x = random(width/2,width);
            var y = random(0,height);
            var zombie = createSprite(x,y, 15,15);
            
            var animeVelX = 0;
            var animeVelY = 0; 
            var life = 30;
            switch(random([1,2,3])){
                case 1: zombie.addAnimation("z1",z1Img);
                        animeVelX = -1;
                        animeVelY = random(-1,1); 
                        life = width;
                        break;
                case 2: zombie.addAnimation("z2",z2Img);
                        zombie.mirrorX(-1);
                        zombie.scale = 0.8
                        animeVelX = -1.5;
                        animeVelY = random(-1,1); 
                        life = width;
                        break;
                default:zombie.addAnimation("z3",z3Img);
                        zombie.mirrorX(-1);
                        animeVelX = 0;
                        animeVelY = 0; 
                        break;
            }
            
            zombie.velocityX = animeVelX;
            zombie.velocityY = animeVelY;
            zombie.lifetime = life; 
            zombieGroup.add(zombie);

            if(zombie.x<5){ zombie.velocityX *= -1}
            if(zombie.x>width-5){ zombie.velocityX *= -1}
            if(zombie.y<5){ zombie.velocityY *= -1}
            if(zombie.y>height-5){ zombie.velocityY *= -1}
        }

    }  

    checkCollision(){
        players[player.index-1].overlap(zombieGroup, function(plr, zom){
            player.life -= 1; 
            zom.remove()
            player.updatePlayer();
        })

        players[player.index-1].overlap(potionGroup, function(plr, pot){
            player.potion += 1;
            player.updatePlayer();
            pot.remove();
        })   
    }

    spawnPotion(){
        if(frameCount% random([450,550,650]) == 0){
            var x = random(50,width-50);
            var y = random(50,height-50);
            var potion = createSprite(x,y, 15,15);
            potion.addAnimation("potion", potionImg);
            potion.scale = 0.1;
            potion.life = random([50,80,100]);
            potionGroup.add(potion)
        }
    }

    gameEnd(){

        console.log("Game Ended")
        console.log("life "+player.life)
        console.log(player.name+" ,you collected "+player.potion+" potion")
        gameState = 4
    }
}