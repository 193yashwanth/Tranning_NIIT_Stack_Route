// oridnary parameter and rest parameters
function multiply(multilier, ...theargs) {
    return theargs.map(element => {
        return multilier*element
    })
}
let arr = multiply(2,1,2,3);
console.log(arr) // [2,4,6]