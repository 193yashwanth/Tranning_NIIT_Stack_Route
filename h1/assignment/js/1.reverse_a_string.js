class reverse{
    constructor(str){
        this.str=str
    }
    static rev(a){
        var b=a.split("");
        var c=b.reverse()
        var d=c.join("")
        return d
    }
}
const p1=new reverse('hello');
console.log(p1.rev("hello"))