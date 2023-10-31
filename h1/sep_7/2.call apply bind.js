var car = {
    registation_number: "ft1234",
    brand: "benz",
    displaydetauls: function( ){
        console.log(this.registation_number + " " + this.brand);
    }

}
//car.displaydetauls(); // ft1234 benz

//but what if we want to borrow a method?
//var mycardetails= car.displaydetails;
//mycardetails();


//let me rewrite the car object:
var mycardetails = car.displaydetauls.bind(car);
mycardetails(); // ft1234 benz

var car = {
    registation_number: "ft1234",
    brand: "benz",
    displaydetauls: function(ownername ){
        console.log(ownername + ",this is your car:"+ this.registation_number + " " + this.brand);
    }
}
//example of passing arguments with bind():
var mycardetails = car.displaydetauls.bind(car, "yashwanth")
mycardetails();



var car = {
    registation_number: "ft1234",
    brand: "benz",
}
    function displaydetauls(ownername ){
        console.log(ownername + ",this is your car:"+ this.registation_number + " " + this.brand);
    }
// // we can use the apply() function:
displaydetauls.apply(car, ["yashwanth"]);  //yashwanth, this is your car: ft1234 benz
//or
displaydetauls.call(car, "yashwanth"); //yashwanth, this is your car: ft1234 benz