class animal{
    constructor(name){
        this.name=name;
    }
    speak() {
        console.log(`${this.name} makes a noise. `)
    }
}
class dog extends animal {
    constructor(name){
        super(name);
    }
    barks() {
        console.log(`${this.name} barks.`);
    }
}
var d = new dog("pug");
d.speak();
d.barks();