class factorial {
    constructor(num) {
        this.num = num;
    }
    fac_num() {
        var a = 1;
        for (var i = 1; i<=this.num; i++) {
            a *= i;
        }
        return a;
    }
}
var p1 = new factorial(3);
console.log(p1.fac_num())