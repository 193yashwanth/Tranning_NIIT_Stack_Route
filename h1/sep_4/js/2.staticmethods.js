class point{
    constructor(x,y){
        this.x=x;
        this.y=y
    }
    static distance(a,b){
        const dx=a.x - b.x;
        const dy=a.y - b.y;
        return Math.hypot(dx,dy);
    }
}
const p1=new point(5,5);
const p2=new point(10,10);
console.log(p1.distance);
console.log(p2.distance);
console.log(point.distance(p1,p2));