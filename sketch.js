var bg
var alien, alienImg, alienGroup
var spaceship, spaceshipImg
var edges
var lightning, lightningImg, lightningGroup, lightning2, lightning2Group
var gameState = 'play'
var score = 0
var booster, boosterImg, boosterGroup
var hitSound
var gameOverSound
var victorySound


function preload(){
  bg = loadImage("spacebg.jpeg")
  alienImg = loadImage("alien.png")
  spaceshipImg = loadImage("spaceship.png")
  lightningImg = loadImage("lightning.png")
  boosterImg = loadImage("booster.png")
  hitSound = loadSound('hit.wav')
  gameOverSound = loadSound('gameOver.wav')
  victorySound = loadSound('victory.mp3')
}

function setup() {
  createCanvas(displayWidth,displayHeight - 20);
  spaceship = createSprite(displayWidth / 2, displayHeight - 100, 50, 50);
  spaceship.addImage(spaceshipImg)
  spaceship.scale = 0.3
  edges = createEdgeSprites()

  lightningGroup = new Group()
  lightning2Group = new Group()
  alienGroup = new Group()
  boosterGroup = new Group()
}



function draw() {
  background(bg);
  drawSprites();
  textSize(20)
  fill(255)
  text('SCORE: ' + score, 50, 50)
  textSize(30)
  text('Reach 200 points to win!', displayWidth/2 - 150, 50)
  if (gameState==='play'){
  spaceship.velocityX = 0
  spaceship.velocityY = 0
  spaceship.collide(edges[0])
  spaceship.collide(edges[1])
  spaceship.collide(edges[2])
  spaceship.collide(edges[3])
  
  if (keyDown('A')){
    spaceship.velocityX = -6
  }

  if (keyDown('D')){
    spaceship.velocityX = 6
  }

  if (keyDown('W')){
    spaceship.velocityY = -6
  }

  if (keyDown('S')){
    spaceship.velocityY = 6
  }

  spawnAlien()

  if (keyWentDown("space")){
   createLightning()

  }

  if (keyWentDown("M")){
    createLightning2()
  }

  if (keyWentDown(DOWN_ARROW)){
    spaceship.mirrorY(spaceship.mirrorY() * (-1))

  }

  for (var i = 0; i < alienGroup.length; i++){
    if (alienGroup.get(i).isTouching(lightningGroup)){
      score = score + 5
      alienGroup.get(i).destroy()
      hitSound.play()
    } 
  }

  for (var i = 0; i < alienGroup.length; i++){
    if (alienGroup.get(i).isTouching(lightning2Group)){
      score = score + 5
      alienGroup.get(i).destroy()
      hitSound.play()
    } 
  }


  if (alienGroup.isTouching(spaceship)){
    spaceship.destroy()
    gameOverSound.play()
    gameState = 'end'
  }

  if (score===200){
    victorySound.play()
    gameState = 'won'
  }
  spawnBooster()


  for (var i = 0; i < boosterGroup.length; i++){
    if (boosterGroup.get(i).isTouching(spaceship)){
      score = score + 20
      boosterGroup.get(i).destroy()
    } 
  }
}

if (gameState==='end'){
  textSize(60)
  fill(255, 0, 0)
  text("Game Over!", displayWidth / 2 - 170, displayHeight / 2)
  alienGroup.setVelocityXEach(0)
  alienGroup.setLifetimeEach(-1)
  lightningGroup.destroyEach()
  lightning2Group.destroyEach()
}

if (gameState==='won'){
  textSize(60)
  fill(255, 255, 0)
  text("You won!", displayWidth / 2 - 170, displayHeight / 2)
  alienGroup.destroyEach()
  lightningGroup.destroyEach()
  lightning2Group.destroyEach()
}
}

function spawnAlien(){
  if (frameCount%50===0){
    alien = createSprite(-15, 100)
    alien.y = random(50, displayHeight - 100)
    var rand = Math.round(random(1,2))
    if (rand===1){
      alien.x = -15
      alien.velocityX = 7 + score/20
    }
    else {
      alien.x = displayWidth + 15
      alien.velocityX = -(7 + score/20)
      alien.mirrorX(alien.mirrorX() * (-1))
    }
    alien.addImage(alienImg)
    alien.scale = 0.2
    alien.lifetime = displayWidth/6
    alienGroup.add(alien)
    
  }
}

function createLightning(){
  lightning = createSprite(spaceship.x + 32, spaceship.y - 100)
  lightning.addImage(lightningImg)
  lightning.scale = 0.2
  lightning.velocityY = -6
  lightning.lifetime = displayHeight/6
  lightningGroup.add(lightning)
}

function createLightning2(){
  lightning2 = createSprite(spaceship.x + 5, spaceship.y + 100)
  lightning2.addImage(lightningImg)
  lightning2.scale = 0.2
  lightning2.velocityY = 6
  lightning2.lifetime = displayHeight/6
  lightning2Group.add(lightning2) 

  
}

function spawnBooster(){
  if (frameCount%500===0){
    booster = createSprite(234,234)
    booster.addImage(boosterImg)
    booster.y = random(50, displayHeight - 100)
      var rand = Math.round(random(1,2))
      if (rand===1){
        booster.x = -15
        booster.velocityX = 15
      }
      else {
        booster.x = displayWidth + 15
        booster.velocityX = -7
      }
      booster.scale = 0.2
      booster.lifetime = displayWidth/6
      boosterGroup.add(booster)
  }
 
}