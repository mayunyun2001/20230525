var monster_color ="dad7cd-a3b18a-588157-3a5a40-344e41".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物的類別，名稱為Monster

    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、初始顯示位置....)
        this.r = args.r ||100  //設計怪物的主體，有大有小時， 如果有傳參數args.r來設定怪物的大小，沒有傳參數，就以10為主
        this.p = args.p ||createVector(random(width),random(height)) //設定一個向量，由亂數抽取顯示的初始位置
        this.v = args.v ||createVector(random(-1,1),random(-1,1) ) //移動的速度，如果沒有傳參數，就會利用亂數(-1,1)抽出xy軸的移動速度
        this.color = args.color ||random(fill_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //代表活者
        this.timenum = 0 //延長時間，讓它顯示死亡後的畫面
      }
    
    draw(){
        if(this.dead == false){
            push()
                translate(this.p.x,this.p.y)
                fill(this.color)
                noStroke()
                ellipse(0,0,this.r)
        if(this.mode=="happy"){
            fill(255)
            ellipse(0,0,this.r/2)
            fill(0)
            ellipse(0,0,this.r/3)
        }else{
            fill(255)
            arc(0,0,this.r/2,this.r/2,0,PI)
            fill(0)
            arc(0,0,this.r/3,this.r/3,0,PI)
        }
        stroke(this.color)
        strokeWeight(4)
        noFill()
        for(var j=0;j<8;j++){
            rotate(PI/4)
            beginShape()
                for(var i =0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                }
                endShape()
        }
        pop()
    }
    else
    {
        this.timenum = 
    
    
    update(){
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){
            this.v.x = -this.v.x
        }
        if(this.p.y<=0 || this.p.y>=height){
            this.v.y = -this.v.y
        }
    }
    isBallIRanger(x,y){
        let d = dist(x,y,this.p.x,this.p.y)
        if(d<this.r/2){
            return true   
        }else{
            return false
        }
    }
}