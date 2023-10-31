class user {
    _name = "";
    constructor(name)
    {
        this._name = name
    }
    sayhi()
    {
        console.log(this._name);
    }
}
var User = new user("yashwanth");
User.sayhi();
