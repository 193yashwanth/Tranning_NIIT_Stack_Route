// before ES6:
//assigning object attbutes to variables
// const person ={
//     name: 'sara',
//     age: 25,
//     gender: 'female',
// }
// let name = person.name;
// let age = person.age;
// let gender = person.gender;
// console.log(name);
// console.log(age);
// console.log(gender);

// fore ES6:
//assigning object attbutes to variables
const person ={
    name: 'sara',
    age: 25,
    gender: 'female',
}
//destructuring assigment
let { name, age, gender} = person;
console.log(name); 
console.log(age);
console.log(gender);