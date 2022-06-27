/************ VARIABLES *************/



// creating levels
let Level  = document.getElementById('level')
let b ;
let btn = document.getElementById('newGame')
window.addEventListener('keypress',(e)=>{
     if(e.key == "Enter"){
          location.reload()
     }
})
btn.addEventListener('click',()=>{

b =Level.value
console.log(speed)
if(b == 1){
     level_1() 
 }
 if(b == 2){
     level_2() 
 }
 
 if(b == 3){
     level_3() 
 }
 
 if(b == 4){
     level_4() 
 }
 
 if(b == 5){
     level_5() 
 }
 
     start();
})



const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')
let speed = 2
var lives = 5
var score = 0
var color_array = [     // FOR BRICKS 
     '#ffaa33',
     '#ggffaaa',
     '#00ff00',
     '#4411aa',
     '#ff1100'
]

// SOUND 
const gameSound = new Audio('./sound/backgraound sound.mp3')
const gameOver = new Audio('./sound/gameOver.wav')
const player_hit = new Audio('./sound/player_hit.wav')
const brick_hit = new Audio('./sound/brick_hit Trim.wav')

/************** OBJECTS ***************/
// PLAYER 
const player = {
     x: canvas.width / 2 - 50,
     y: canvas.height - 20,
     pw: 100,
     ph: 10,
     start: true
}


// BALL .......... 
const ball = {
     x: player.x + player.pw / 2,
     y: canvas.height - 30,
     radius: 10,
     dy: speed,
     dx: speed
}


// listening event .......
let keys = {
     ArrowRight: false,
     ArrowLeft: false,
     Enter:false
}

window.addEventListener('keydown', keydown)
window.addEventListener('keyup', keyup)
function keydown(e) {
     keys[e.key] = true
     console.log(keys)
}
function keyup(e) {
     keys[e.key] = false
     console.log(keys)

}








// console.log(btn)

//********** UPDATING FUNCTION  **********//

function draw_ball() {
     c.beginPath()
     c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false)
     c.fillStyle = 'red'
     c.fill()
     c.stroke()

}




function draw_player() {
     c.beginPath()
     c.fillStyle = 'black'
     c.fillRect(player.x, player.y, player.pw, player.ph)
     c.stroke()

}
function draw_border() {
     c.beginPath()
     c.fillStyle = 'black'
     c.fillRect(720, 0, 3, canvas.height)
     c.stroke()

}


function reset_ball() {
     ball.dy = -ball.dy
     ball.x = player.x + player.pw / 2
     ball.y = canvas.height - 30
     ball.radius = 10
}

function Lives() {
     c.font = "25px Arial"
     c.fillStyle = 'red'
     c.fillText(`Lives : ${lives}`, canvas.width - 150, 50)
}

function Score() {
     c.font = "25px Arial"
     c.fillText(`Score : ${score}`, canvas.width - 155, 100)
}


//************** CREATING BRICK FUNCTION ************* //
const brick = {
     x: 5,
     y: 5,
     w: 70,
     h: 20
}
function brick_func(x, y, w, h) {
     this.x = x
     this.y = y
     this.w = w
     this.h = h
     this.color = color_array[Math.floor(Math.random() * color_array.length)]
     this.draw = function () {
          c.beginPath()
          // c.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
          c.fillStyle = this.color
          c.fillRect(this.x, this.y, this.w, this.h)
          c.stroke();
     }
     this.update = function () {

          this.draw()
     }
}
let brickArray = []

// CREATING BRICKS USING FOR LOOP
function level_1() {   
 brickArray = []
for (i = 0; i < 9; i++) {
     for (j = 0; j < 9; j++) {
          brickArray.push(new brick_func(brick.x, brick.y, brick.w, brick.h))
          brick.x += brick.w + 10
     }

     brick.y += brick.h + 5
     brick.x = 5
}
}
function level_2() {   
 brickArray = []
for (i = 0; i < 9; i++) {
     for (j = i; j < 9; j++) {
          brickArray.push(new brick_func(brick.x, brick.y, brick.w, brick.h))
          brick.x += brick.w + 10
     }

     brick.y += brick.h + 5
     brick.x = 5
}
}
function level_3() {   
 brickArray = []
for (i = 0; i < 9; i++) {
     for (j = 0; j <= i; j++) {
          brickArray.push(new brick_func(brick.x, brick.y, brick.w, brick.h))
          brick.x += brick.w + 10
     }

     brick.y += brick.h + 5
     brick.x = 5
}
}
function level_4() {   
 brickArray = []
for (i = 0; i < 13; i++) {
     for (j = 0; j < 9; j++) {
          if(i%3==0){
          brickArray.push(new brick_func(brick.x, brick.y, brick.w, brick.h))
          brick.x += brick.w + 10
          }
     }

     brick.y += brick.h + 5
     brick.x = 5
}
}
function level_5() {   
 brickArray = []
for (i = 13; i > 0; i--) {
     for (j = i; j > 0; j--) {
          if(j%2==0){
          brickArray.push(new brick_func(brick.x, brick.y, brick.w, brick.h))
          brick.x += brick.w + 50
          }
     }

     brick.y += brick.h + 15
     brick.x = 5
}
}

//********* END GAME FUNCTION **********/

function endGame() {
     gameSound.pause()
     gameOver.play()
     c.font = "60px Arial"
     c.fillStyle = 'blue'
     c.fillText(`Game Over`, canvas.width / 2 - 220, canvas.height / 2)
     c.font = "30px Arial"
     c.fillText(`Press enter to exit the game`, canvas.width / 2 - 250, canvas.height / 2+60)
     player.start = false;
}

function winGame() {
     gameSound.pause()
     // gameOver.play()
     c.font = "60px Arial"
     c.fillStyle = 'red'
     c.fillText("Level Clear", canvas.width / 2 - 200, canvas.height / 2)
     player.start = false;
}
 function startScreen(){
     c.font = "60px Arial"
     c.fillStyle = 'blue'
     c.fillText("Hit the Brick", canvas.width/2 -250, canvas.height / 2 - 200)
     c.font = "30px Arial"
     c.fillText("Select level to start the game", canvas.width/2 -270, canvas.height / 2 - 125)
 }

// start();
draw_ball()
draw_player()
Lives();
Score()
draw_border()
startScreen()
//************* MAIN LOGIC START HERE ***************// 
function start() {
     if (player.start) {
          gameSound.play()
          c.clearRect(0, 0, window.innerWidth, window.innerHeight)
          draw_ball()
          draw_player()
          Lives();
          Score()
          draw_border()
          let level = document.getElementById('level')
          // DELETING BRICK 
          for (i = 0; i < brickArray.length; i++) {
               brickArray[i].update()
               if (ball.y - ball.radius <= brickArray[i].y + brickArray[i].h && (ball.x + ball.radius > brickArray[i].x && ball.x - ball.radius <= brickArray[i].x + brickArray[i].w)) {
                    brickArray.splice(i, 1)
                    score++
                    brick_hit.play()
                    ball.dy = -ball.dy
               }
          }

          // WIN GAME CONDITION 
          if (brickArray.length == 0) {
               winGame()
          }

          // PLAYER MOVEMENT 
          if (keys.ArrowRight) {
               if (player.x + player.pw <= 720 - 10) {
                    player.x += speed
               }
          }
          if (keys.ArrowLeft) {
               if (player.x >= 0) {
                    player.x -= speed
               }
          }
         



          // BALL MOVEMENT
          if (ball.y - ball.radius <= 0) {
               ball.dy = -ball.dy


          }
          if (ball.x + ball.radius >= 720 || ball.x - ball.radius <= 0) {
               ball.dx = -ball.dx
          }

          ball.x -= ball.dx
          ball.y -= ball.dy


          // BALL STRIKING THE BRICK
          if ((ball.x + ball.radius > player.x && ball.x - ball.radius < player.x + player.pw) && ball.y + ball.radius == player.y) {
               ball.dy = -ball.dy
               player_hit.play()
               draw_ball()
          }

          // BALL RESET
          if (ball.y > canvas.height + 100) {
               lives--

               if (lives == 0) {
                    endGame()

               }

               reset_ball()
          }
          window.requestAnimationFrame(start)
     }
}













