class person {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
    display() {
        console.log('the name is: ', this.name);
        console.log(`and the age is ${this.age}`);
    }
}
var p1 = new person("roshan", 20);
p1.display()