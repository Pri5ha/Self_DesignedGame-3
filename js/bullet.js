class Bullet{
    constructor(x,y){
        var options = {
            isStatic: true
        };

        this.w = 120
        this.h = 30

        this.body = Bodies.rectangle(x,y,120,30,options);

        this.image = loadImage("./assets/bullet.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.w,this.h);
        pop();
        //console.log("hi")
    }

    shoot(){
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{x:100,y:-1});
    }

    remove(index){
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

        setTimeout(() => {
            Matter.World.remove(world, this.body);
            delete bullets[index];
        }, 500);
    }
}