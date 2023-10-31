class animal{
    constructor(name){
        this.name=name;
    }
    speak() {
        console.log(`${this.name} makes a noise. `)
    }
}
var ani = new animal("elephant");
ani.speak();