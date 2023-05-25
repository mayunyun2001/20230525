# 20230525
# 0508作業

滑鼠按下出現大象
---
```javascript=
class object{ //宣告一個類別，針對一個畫的圖案
    constructor(args){  //物件的基本資料(顏色、大小、移動速度以及初始顯示位置等等)
      this.p = args.p || {x:random(width),y:random(height)} 
      //設定為該物件的初始位置，從x軸寬度隨機以及從y軸高度隨機
      // ||是or的意思，當產生一個物件時，有傳給位置參數，則使用該參數
      // 如果沒有傳送參數則用||後面的參數(隨機)
```
args 參數設定

---


碰到牆壁會反彈
---
```javascript=
this.p.x = this.p.x +this.v.x //x軸目前位置(this.p.x)加上x軸的移動速度(this.v.x)
      this.p.y = this.p.y +this.v.y
      if(this.p.x<=0|| this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=寬度)
        this.v.x = -this.v.x //加上負號是改變方向，把x軸速度及方向改變(左右)
      }
      if(this.p.y<=0|| this.p.y>=height){//y軸碰到上面(<=0)，或是碰到下面(>=高度)
        this.v.y = -this.v.y//加上負號是改變方向，把y軸速度及方向改變(上下)
      }
    }
```

---
滑鼠點擊後大象會消失
---
先設定以下程式碼
 ```javascript=
isBallInRanger(){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(mouseX,mouseY,this.p.x,this.p.y)  
      //計算兩點之間的距離(滑鼠按下的點與物件中心點之間的距離)，放到d變數內(dist=distance)
      if(d<4*this.size){ //看所畫物件的xy軸正負號最大及最小算出中心點
        return true //滑鼠與物件的距離小於物件的寬度代表碰觸到了，則傳回true的值(觸碰)
        
      }else{
        return false //滑鼠與物件距離大於物件寬度，代表沒有碰到，則傳回false的值(未觸碰)
      }
    
    }
```
再寫下這串程式碼
```javascript=
for(let ball of balls){ //檢查每一個物件是否碰到滑鼠
    if(ball.isBallInRanger()){
      balls.splice(balls.indexOf(ball),1) 
      //splice=清除
      //從balls取出被滑鼠點擊的物件編號(balls.indexOf(ball))，只取一個

    }
  }


```
---

計分模式
---
```javascript=
var score = 0
//var score = 60 (遊戲設定為按下大象扣一分)

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  text(score,50,50) //顯示score，在座標50，50的位置
  for(let ball of balls) //只要是陣列的方式都可以用此方式來處理
  {
    ball.draw()
    ball.update()
  }
}

for(let ball of balls){ //檢查每一個物件是否碰到滑鼠
    if(ball.isBallInRanger()){
      balls.splice(balls.indexOf(ball),1) 
      //splice=清除
      //從balls取出被滑鼠點擊的物件編號(balls.indexOf(ball))，只取一個
      score = score + 1 //消失一個就加一分
//score = score - 1 (按下大象扣一分)
    }
  }
```
---

向量
---

```javascript=
this.p = args.p|| createVector(random(width),random(height)) //新寫法
this.v = createVector(random(-1,1),random(-1,1)) //vector是向量

update(){
      // this.p.x = this.p.x +this.v.x //x軸目前位置(this.p.x)加上x軸的移動速度(this.v.x)
      // this.p.y = this.p.y +this.v.y
      this.p.add(this.v) //設定好向量後，此程式能有與上面兩行一樣的效果
```
```javascript=
//第一步:知道滑鼠的位置，並建立一個滑鼠的向量
      let mouseV = createVector(mouseX,mouseY) //把滑鼠的位置轉換成一個向量值
      let delta = mouseV.sub(this.p).limit(3) 
      //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)的距離，每次以3移動靠近
      this.p.add(delta)
```
```javascript=
let delta = mouseV.sub(this.p).limit(this.v.mag()*3)  //mag是大小
      //this.v.mag()代表該物件的速度大小(一個向量值有大小與方向)
```
