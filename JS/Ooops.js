// let car = {
//     make: "Toyota",
//     model: "Corolla",
//     year: 2019,
//     color: "red",
//     mileage: 30000,
//     isUsed: true,
//     start : function() {
//         console.log("car started on " + this.year);
        
//     },
// }

class Car {
    constructor(make, model, year, color, mileage, isUsed) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.mileage = mileage;
        this.isUsed = isUsed;
    }
    start() {
        console.log("car started on " + this.year);
    }
}

//Inheritance

class ElectricCar extends Car {
    constructor(make, model, year, color, mileage, isUsed, batteryLife) {
        super(make, model, year, color, mileage, isUsed);
        this.batteryLife = batteryLife;
    }
    charge() {
        console.log("car is charging");
    }
}

let myElectricCar = new ElectricCar("Tesla", "Model S", 2020, "black", 0, false, "100%");


// console.log(myElectricCar);



// Encaosulation

class Account{
    #balance = 0;
    getBalance() {
        return this.#balance;
    }
    deposit(amount) {
        this.#balance += amount;
    }
    
}

let myAccount = new Account();
// console.log(myAccount.getBalance());
// myAccount.deposit(100);
// console.log(myAccount.getBalance());




//Abstraction


class CoffeeMachine{
    start(){
        return "machine started";
    }

    brew(){
        return "Coffee brewed";
    }

    pressButton(){
        console.log(this.start());
        console.log(this.brew());
    }
}

let myCoffeeMachine = new CoffeeMachine();
// myCoffeeMachine.pressButton();





//Polymorphism
class Bird{
    fly(){
        return "Bird can fly";
    }
}


class Penguin extends Bird{
    fly(){
        return "Penguin can't fly";
    }
}

let bird = new Bird();
let penguin = new Penguin();


// console.log(bird.fly());
// console.log(penguin.fly());



//static methods


class Calculator{
    static add(a, b){
        return a + b;
    }
}

let calc = new Calculator();
console.log(Calculator.add(2, 3));




// Getters and Setters

class Employee{
    constructor(name, salary){
        this.name = name;
        this._salary = salary;
    }

    get salary(){
        // return this._salary;
        console.error("Access Denied");
    }
    
    set salary(value){
        if(value < 0){
            console.error("Invalid Salary");
        }
        else{
            this._salary = value;
        }
    }
}



let emp = new Employee("John", 50000);


console.log(emp.grossSal);   
