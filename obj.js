//class 類別
class Obj{ //宣告一個類別，針對一個畫的圖案
    constructor(args){  //物件的基本資料(顏色、大小、移動速度以及初始顯示位置等等)
      //this.p = args.p || {x:random(width),y:random(height)} 
      //設定為該物件的初始位置，從x軸寬度隨機以及從y軸高度隨機
      // ||是or的意思，當產生一個物件時，有傳給位置參數，則使用該參數
      // 如果沒有傳送參數則用||後面的參數(隨機)
      this.p = args.p|| createVector(random(width),random(height)) //新寫法
      //this.v = {x:random(-1,1),y:random(-1,1)} //設定該物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1)) //vector是向量
      this.size = random(10,20) //一個物件的放大倍率，10~30之間
      this.color = random(fill_colors)
      this.stroke = random(line_colors)
    } 
    draw(){ //把object畫出來
      push()//執行push()後，依照我設定的原點(0,0)位置
        translate(this.p.x,this.p.y) //以該物件的位置為原點。this.p.x=前面設定的初始位置以及x所出現的隨機位置
        scale(this.v.x<0?1:-1,-1)//鼻子朝哪往那兒移動
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)
        beginShape()
        for(var k=0; k < points.length-1;k=k+1){
          //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size) //k會從0開始，逗點前後是第一個點和第二個點
          vertex(points[k][0]*this.size,points[k][1]*this.size) //也是一個畫線的指令，只需提供一個點座標，當指令到endshape()，會把所有的點串接在一起。
          //curveVertex(points[k][0]*this.size,points[k][1]*this.size)//圓弧的方式
        }
        endShape()
      pop()  //執行pop()之後，原點(0,0)設定回到整個視窗的左上角
      
    }
    update(){
      // this.p.x = this.p.x +this.v.x //x軸目前位置(this.p.x)加上x軸的移動速度(this.v.x)
      // this.p.y = this.p.y +this.v.y
      this.p.add(this.v) //設定好向量後，此程式能有與上面兩行一樣的效果
      //向量sub==>減號

      //第一步:知道滑鼠的位置，並建立一個滑鼠的向量
      let mouseV = createVector(mouseX,mouseY) //把滑鼠的位置轉換成一個向量值
      let delta = mouseV.sub(this.p).limit(3) 
      //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)的距離，每次以3移動靠近
      this.p.add(delta)
  
      if(this.p.x<=0|| this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=寬度)
        this.v.x = -this.v.x //加上負號是改變方向，把x軸速度及方向改變(左右)
      }
      if(this.p.y<=0|| this.p.y>=height){//y軸碰到上面(<=0)，或是碰到下面(>=高度)
        this.v.y = -this.v.y//加上負號是改變方向，把y軸速度及方向改變(上下)
      }
    }
    isBallInRanger(){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(mouseX,mouseY,this.p.x,this.p.y)  
      //計算兩點之間的距離(滑鼠按下的點與物件中心點之間的距離)，放到d變數內(dist=distance)
      if(d<4*this.size){ //看所畫物件的xy軸正負號最大及最小算出中心點
        return true //滑鼠與物件的距離小於物件的寬度代表碰觸到了，則傳回true的值(觸碰)
        
      }else{
        return false //滑鼠與物件距離大於物件寬度，代表沒有碰到，則傳回false的值(未觸碰)
      }
    
    }
}