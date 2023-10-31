class cal{
    constructor(x,y){
        this.x=x;
        this.y=y
    }
    addd(a,b){
        const c= a+b;
        return c
    }
    sub(a,b){
        const c=a-b;
        return c;
    }
    mul(a,b){const c=a*b;return c;}
    div(a,b){const c=a/b;return c;}
    
}
const p1=new cal(2,5);
console.log(p1.addd(2,5))
console.log(p1.sub(2,5))
console.log(p1.mul(2,5))
console.log(p1.div(2,5))