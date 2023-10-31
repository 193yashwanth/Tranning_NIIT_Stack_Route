class bank {
    constructor(deposit,withdraw,checking_the_balance) {
        this.deposit = deposit;
        this.withdraw = withdraw;
        this.checking_the_balance = checking_the_balance;
    }
    display() {
        console.log("the amount deposited is : ",this.deposit);
        console.log("the amount withdraw is : ",this.withdraw);
        console.log("the balance is :", this.checking_the_balance);
    }
}
class saving_account extends bank{
    constructor(deposit,withdraw,checking_the_balance) {
        super(deposit,withdraw,checking_the_balance);
    }
    dis() {
        console.log('this is a savings account ')
    }
}
var p1 = new saving_account(23,34,4567);
p1.display();
p1.dis();