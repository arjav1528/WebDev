function outer(){
    let counter = 4;
    return function(){
        return ++counter;
    }
}
let increment = outer();
console.log(increment());
console.log(increment());
console.log(increment());
console.log(increment());
console.log(increment());