// this example function accepts any number of string arguments and returns the longest one
function longersString() {
    var longest = '';
    for (var i=0; i< arguments.length; i++) {
        if (arguments[i].length > longest.length) {
            longest = arguments[i];
        }
    }
    return longest;
}
console.log(longersString('asdfghj','zxcvbnm','qwertyuiop','qwertyuioasdfgh'));
