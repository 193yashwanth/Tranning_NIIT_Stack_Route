// 'use strict'


// function printThis() {
//     console.log(this)
// }
// printThis()  // this refers to the window, or global object.

// const india = {
//     name: 'the country india',
//     independence_on: 1947,

//     describe() {
//         console.log(`${this.name} got its independence on ${this.independence_on}.`)
//     }
// }
// india.describe()

// const india = {
//     name: 'the country india',
//     independence_on: 1947,

//     details: {
//         flag: 'tricolored',
//         currency: 'inr',
//         printdeatils() {
//             console.log(`the flag is ${this.name} and the currency is ${this.currencyn}.`)
//         },
//     },
// }
// india.details.printdeatils()


// function country(name, independence) {
//     this.name = name
//     this.independence = independence
//     this.describe = function() {
//         console.log(`${this.name} got its independence on ${this.independence}.`)
//     }
// }
// const india = new country('the country india', 1947)
// india.describe()

// class country {
//     constructor(name, independence) {
//     this.name = name
//     this.independence = independence
//     }
//     describe() {
//         console.log(`${this.name} got its independence on ${this.independence}.`)
//     }
// }
// const india = new country('the country india', 1947)
// india.describe()

// const add = function(a, b) {
//     return a+ b; //function add(a,b){}
// };
// const addarrow = (a,b) => a + b;
// console.log(add(2,3));
// console.log(addarrow(2,3));


// const mynameis = {
//     name: 'yashwanth',
//     regular_function: function() {
//         console.log(this.name)
//     },
//     arrow_function: ()  => { 
//         console.log(this.name)
//     },
// }
// mynameis.regular_function()
// mynameis.arrow_function()

//sample data: an array of person objects

const people = [
    { name: 'alice', age: 30},
    { name: 'bob', age: 25},
    { name: 'charlie', age: 35},
    { name: 'david', age: 28},
];
//example 1: filtering people older than 30 using arrow function
const olderthan30 = people.filter(person => person.age > 30);
console.log('people older than 30:', olderthan30)
//example 2: mapping names to uppercase using arrow function
const uppercasename = people.map(person=> person.name.toUpperCase());
console.log('uppercase names:' , uppercasename)
//example 3: calculating the avrage age using arrow function and reduce
const totalage = people.reduce((sum, person) => sum + person.age, 0);
const averageage = totalage / people.length;
console.log("average age: ", averageage)
//emample 5: arrow function in an object method
const persondetails = {
    name:'eve',
    age:22,
    introduce: () => {
        console.log(`hi, i'm ${this.name}, and i'm ${this.age} years old.`);
    },
}
persondetails.introduce(); // this will not work as expected due to lexical this 
