class sum_of_elements {
    constructor (arr) {
        this.arr = arr;
    }
    add(){
        var b=0
        for (var i=0; i<this.arr.length; i++) {
            b += this.arr[i];
        }
        return b;
    }
}
var p1 = new sum_of_elements([2,3,5,6,1])
console.log(p1.add())