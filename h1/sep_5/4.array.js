// there are two syntaxes for creating an empty arry:
let arr = new Array();
let arr1 = [];

// almost all the time, the second syntex is used. we can supply initial elements in the brackets:
let fruits1 = ["pine", "banana", "cherry"];

// we can get an element by its number in square brackets:
let fruits =["pine", "banana", "cherry"];
console.log ( fruits[0] ); // pine
console.log ( fruits[1] ); // banana
console.log ( fruits[2] ); // cherry

//we can replace an element:
fruits[2] = "pear"; // now ['pine', 'banana', 'pear']
// ...or add a new one to the array:
fruits[3] = "lemon"; // now ['pine', 'banana', 'pear', 'lemon']

console.log ( fruits.length ); //4