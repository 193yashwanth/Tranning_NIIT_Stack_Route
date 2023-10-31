function add(){
    var fn=+document.getElementById("num1").value;
    var ln=+document.getElementById("num2").value;
    document.getElementById("result").innerHTML = fn + ln;
}
function sub(){
    var fn=Number(document.getElementById("num1").value);
    var ln=Number(document.getElementById("num2").value);
    document.getElementById("result").innerHTML = fn - ln;
}
function div(){
    var fn=Number(document.getElementById("num1").value);
    var ln=Number(document.getElementById("num2").value);
    document.getElementById("result").innerHTML = fn / ln;
}
function mul(){
    var fn=Number(document.getElementById("num1").value);
    var ln=Number(document.getElementById("num2").value);
    document.getElementById("result").innerHTML = fn * ln;
}
