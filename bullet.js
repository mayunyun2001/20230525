class bullet{
    constructor(args){
        this.r = args.r || 20
        this.p = args.p || shipP.copy()          //createVector(width/2,height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
        this.color = args,color || "#1982c4"
    }
    draw(){
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
        pop()
    }
    update(){
        this.p.add(this.v)
    }
}