let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，
//只有點，畫不出來，下面用DRAW指令畫出來
var fill_colors = "6b9080-a4c3b2-cce3de-eaf4f4-f6fff8".split("-").map(a=>"#"+a)
var line_colors = "6b9080-a4c3b2-cce3de-eaf4f4-f6fff8".split("-").map(a=>"#"+a)
//

var ball  //目前要處理的物件，暫時放在ball變數內
var balls = []  //把產生的"所有"物件
//
var bullet
var bullets =[]
//
var monster = []
var monsters = []
//
var shipP
// 
var score = 0 //(遊戲設定為按下大象加一分)
//var score = 60 (遊戲設定為按下大象扣一分)

//
function preload(){
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)
  for(var i=0;i<10 ;i=i+1){    //object的數量迴圈，從i=0開始到9(小於10)
    ball = new Obj ({}) //產生一個object class的物件(前面設定的object)
    balls.push(ball) //把ball這個物件放入(push)balls的陣列內
  }
  for(var i=0;i<10 ;i=i+1){    //object的數量迴圈，從i=0開始到9(小於10)
    ball = new Monster({}) //產生一個object class的物件(前面設定的object)
    balls.push(monster) //把ball這個物件放入(push)balls的陣列內
}
}
function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  if(keyIsPressed){
    if(key=="ArrowLeft"||key=="a"){
      shipP.x = shipP.x -5 
    }
    if(key=="ArrowRight"||key=="d"){
      shipP.x = shipP.x +5
  }
  if(key=="ArrowUp"||key=="w"){
    shipP.y = shipP.y - 5
  }
  if(key=="ArrowDown"||key=="s"){
    shipP.y = shipP.y +5
  }
}
  //

  for(let ball of balls) //只要是陣列的方式都可以用此方式來處理
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)
        bullet.splice(bullets.indexOf(ball),1)
        score = score + 1
        elephant_sound.play()
      }
    }
  }

  //飛彈的顯示
  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }
  //怪物的顯示
  for(let monster of monster){
    if(monster.dead == true && monster.timenum>4 ){
      monster.splice(monster.indexOf(monster),1)

    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
        monster.splice(monster.indexOf(monster),1)
        bullets.splice(bullet.indexOf(bullet),1)
        score = score + 1
      }
    }
  }

  textSize(50)
  text(score,50,50)
  push() 
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan(dy,dx)
    translate(width/2,height/2)
    fill("#b5179e")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0)
    ellipse(0,0,50)
  pop()//顯示score，在座標50，50的位置
  //放在後面不會被大象蓋住
}

function mousePressed(){

  //(以下程式碼是按下滑鼠會產生一個物件)
  // ball = new object({
  //   p:{x:mouseX,y:mouseY}}) //在滑鼠按下的地方產生一個object class的物件(前面設定的object)
  // balls.push(ball) //把ball的物件放入到balls陣列內(丟到倉庫)
  //(以上程式碼是按下滑鼠會產生物件)

  //for(let ball of balls){ //檢查每一個物件是否碰到滑鼠
    //if(ball.isBallInRanger()){
    //balls.splice(balls.indexOf(ball),1) 
    //splice=清除
    //從balls取出被滑鼠點擊的物件編號(balls.indexOf(ball))，只取一個
    //score = score + 1 //消失一個就加一分
    //score = score - 1 (按下大象扣一分)

bullet = new bullet({})
bullets.push(bullet)
bullet_sound.play()
}

function keyPressed(){
  if(key==" "){
    bullet = new bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  }
}
  


