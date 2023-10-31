class palindrom{
    constructor(str){
        this.str=str;
    }
    pal(){
        var a=this.str.split("").reverse().join("");
        for (var i=0;i<this.str.length;i++){
            if(this.str[i]===a[i]){
                console.log("palindrom");
                break;
            }
            else{console.log("non-palindrom");break;}
        }
    }
}
var p1 = new palindrom('mam');
p1.pal();