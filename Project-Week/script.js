let player, playerX, enemy, enemyX, enemyY, enemyVelocity, playerIsHit, bulletX, buleltY, bulletV, bulletR, bulletFired, gameIsOver, score, highScore, lives;

function preload() {
  player = loadImage("kindpng_5011943.png");
  enemy = loadImage("clipart2235622.png");
}

function setup() {
  createCanvas(700, 600);
  playerX = width / 2 - 25;
  score = 0;
  highScore = 0;
  lives = 3;
  gameIsOver == false;
  enemies = [];
  numEnemies = 5;
  for(let i = 0; i < numEnemies; i++ ) {
    enemies.push(new Enemies());
  }
  
  bulletX = playerX + 25;
  bulletY = height - 50;
  bulletV = 20;
  bulletR = 5;
  bulletFired = false;
}

class Enemies {
  constructor() {
    this.x = random(0, width-25);
    this.y = 0;
    this.velocity = random(2, 4);
  }

  show() {
    image(enemy, this.x, this.y, 50, 50);
    noStroke();
    noFill();
    rect(this.x, this.y, 50, 50);
  }

  fall() {
    this.y += this.velocity;
    if(this.y > height) {
      this.y = 0;
      this.x = random(25, width-25);
    }
  }

  collide() {
    let hit = collideRectRect(playerX, height - 50, 50, 50, this.x, this.y, 50, 50);
    if(hit === true) {
      lives -= 1;
      playerX = width / 2 - 25;
      this.x = random (0, width - 25);
      this.y = 0;
    }
    
    let dead = collideRectCircle(this.x, this.y, 50, 50, bulletX, bulletY, bulletR*2);

    if(dead === true && bulletY<height-50) {
      this.x = random(0, width - 25);
      this.y = 0;
      score +=1;
      
      bulletFired = false;
    }
  }
}

function draw() {
  if (!gameIsOver) {
    background(0);
    image(player, playerX, height - 50, 50, 50);
    noFill();
    noStroke();
    rect(playerX, height - 50, 50, 50);
    
    if (keyIsDown(LEFT_ARROW) && playerX > 0) {
      playerX -= 3;
    }

    if (keyIsDown(RIGHT_ARROW) && playerX < width - 50) {
      playerX += 3;
    }

    for(let i = 0; i < enemies.length; i++ ) {
      enemies[i].fall();
      enemies[i].show();
      enemies[i].collide();
    }
    
    displayScore();
    setHighScore();
    shootBullet();
    gameOver();
    difficult();
  }
}

function drawBullet() {
  fill(200, 5, 5);
  ellipse(bulletX, bulletY, bulletR*2);
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    bulletFired = true;
    console.log(bulletFired)
  }

  if(gameIsOver == true && keyCode === DOWN_ARROW) {
    createCanvas(700, 600);
    playerX = width / 2 - 25;
    score = 0;
    lives = 3;
    gameIsOver = false;
    numEnemies = 5;
    while(enemies.length > 5) {
      enemies.pop();
    }
  }
}  
 
function shootBullet() {
  if(bulletFired == true) {
    bulletX = playerX + 25;
    bulletY -= bulletV;
    drawBullet();
  }

  if (bulletY < 0) {
    bulletFired = false;
  }

  if (bulletFired == false) {
    bulletY = height - 50;
  }
}

function gameOver() {
  if (lives == 0) {
    gameIsOver = true;
    noStroke();
    fill("black")
    square(0, 0, 700, 600)

    noStroke();
    fill("red")
    textSize(40)
    // textFont('Ariel')
    text('GAME OVER', width / 2 - 110, height / 2 + 25)
    textSize(20)
    text('Press the Down Arrow to restart', width / 2 - 140, height / 2 + 50)
  }
}

function displayScore() {
  strokeWeight(5)
  textSize(15);
  fill(255, 255, 255);
  
  text(`SCORE: ${score}`, 20, 30);
  text(`LIVES: ${lives}`, 20, 50);
  text(`HIGH SCORE: ${highScore}`, width / 2 - 50, 30)
}

function setHighScore() {
  if (score > highScore) {
    highScore = score;
  }
}

function difficult() {  
  if(score % 5 === 0 && enemies.length < (score / 5) + 5) {
    enemies.push(new Enemies());
    
  }
}

// GOALS FOR TOMORROW
// Make ship shoot bullets
// Make ship-alien collision work ===== FINISHED
// Make bullet-alien collision work
// Add scoring/difficulty increase system