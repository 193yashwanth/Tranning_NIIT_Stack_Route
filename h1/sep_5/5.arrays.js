// loops
let arr = ['pine', 'banana', 'pear'];

for (let i = 0; i < arr.length; i++ ) {
    console.log( arr[i]);
}
// but for arrays there is another form of loop, for..of:
let fruits = ['pine', 'banana', 'cherry'];

//iterates over array elements
for (let fruit of fruits) {
    console.log( fruit);
}