// the third argument, manymoreargs, will be an array that contains.
// the 3rd, 4th, 5th, 6th ... nth - as many arguments that the user includes.
function myfun(a,b,c,...manymoreargs) {
    console.log('a', a)
    console.log('b', b)
    console.log('c', c)
    console.log('manymoreargs', manymoreargs)
}

myfun('one', 'two', 'three', 'four','five', 'six')