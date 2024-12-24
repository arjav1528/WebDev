// let i=0;
// let sum = 0;
// while(i<10){
//     sum+=i;
//     console.log(i);
//     i++;
// }
// console.log(sum); // 45


// let countdown = [];
// let i = 5;
// while(i > 0){
//     countdown.push(i);
//     i--;
// }
// console.log(countdown); // [5, 4, 3, 2, 1]


// while(true){
//     person = prompt("Please enter your name");
//     if(person == 'Arjav'){
//         break;
//     }
//     else{
//         console.log("Hello, " + person);
//     }
// }




const object = {
    'London': 1000,
    'Paris': 2000,
    'New York': 3000,
    'Tokyo': 4000,
    'Mumbai': 5000,
}
for(const key in object){
    console.log(object[key]);
}