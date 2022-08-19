class Form{
    constructor(){
      this.titleImg = createImg("./images/title.png");
      this.input = createInput("").attribute("placeholder","enter your name");
      this.playButton = createButton("play");
      this.greeting = createElement("h2");
    }

    setElementsPosition() {
      this.titleImg.position(120, 50);
      this.input.position(width / 2 - 110, height / 2 - 80);
      this.playButton.position(width / 2 - 90, height / 2 - 20);
      this.greeting.position(width / 2 - 300, height / 2 - 100);
    }
  
    setElementsStyle() {
      this.titleImg.class("gameTitleBig");
      this.input.class("customInput");
      this.playButton.class("customButton");
      this.greeting.class("greeting");
    }
  
    hide() {
      this.playButton.remove();
      this.input.remove();
      this.greeting.remove();
    }

    display(){
       this.setElementsPosition();
       this.setElementsStyle();
       this.handleMousePressed();
    }
    
    handleMousePressed(){
      this.playButton.mousePressed(()=>{
        if(this.input.value()!==''){
          this.hide();
          this.titleImg.class("gameTitleSmall");
          this.greeting.html("please wait for another player to join...")
          playerCount += 1
          player.name = this.input.value()
          player.index = playerCount
          player.addPlayer()
          player.updateCount(playerCount)
        }else{
          alert("Please enter a your name ...")
        }
        

      })
  }

}