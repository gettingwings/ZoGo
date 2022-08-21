class Player{
    constructor(){
        this.name = null
        this.index = null
        this.x = 50
        this.y = 0
        this.move = false
    }

    addPlayer(){
        if(this.index === 1){
            this.y = height / 2 - 75;
          } else {
            this.y = height / 2 + 75;
          }
      
        var playerIndex = "players/player"+this.index
        database.ref(playerIndex).set({
            name: this.name,
            x: this.x,
            y: this.y, 
            move: this.move
        })
        
    }

    updateCount(count){
        database.ref("/").update({
            playerCount: count
        })
    }
    
    getCount(){
        database.ref("playerCount").on("value",(data)=>{
            playerCount = data.val()
        })
    }

    updatePlayer(){
        var playerIndex = "players/player"+this.index
        database.ref(playerIndex).update({
            x: this.x,
            y: this.y,
            move: this.move,
        })
    }

    getAllPlayers(){
        database.ref("players").on("value",(data)=>{
            allPlayers = data.val()
        })
    }

}