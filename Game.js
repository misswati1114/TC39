class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("C1",c1);
    car2 = createSprite(300,200);
    car2.addImage("C2",c2)
    car3 = createSprite(500,200);
    car3.addImage("C3",c3)
    car4 = createSprite(700,200);
    car4.addImage("C4",c4)
    arreyCars = [car1, car2, car3, car4]
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(shrek, 0,-displayHeight*4,displayWidth, displayHeight*5);
      var index = 0;
      var  x = 190;
      var y;
      for(var plr in allPlayers){
        index = index + 1
        x = x + 240
        y = displayHeight - allPlayers[plr].distance
        arreyCars[index - 1].x = x;
        arreyCars[index - 1].y = y;
        if (index === player.index){
          arreyCars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = arreyCars[index - 1].y
        }

        
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites()
  }
}
