class fiborial_sequence {
    constructor(num) {
        this.num = num;
    }
    fib_seq() {
        let arr = [0,1];
        for (var i=2; i<=this.num; i++) {
            arr[i] = arr[i-1]  + arr[i-2];
            if (arr[i]==this.num){break}
        }
        return arr
    }
}
var p1 = new fiborial_sequence(13);
console.log(p1.fib_seq())