class count_vowles{
    constructor(str){
        this.str=str;
    }
    vol(){
        let a=0;
        for (let i=0;i<this.str.length;i++){
            if(this.str[i]==='a'|this.str[i]==='e'|this.str[i]==='i'|this.str[i]==='o'|this.str[i]==='u'){
                a++;
            }
        }
        return a
    }
}
const p1=new count_vowles('hello');
console.log(p1.vol())