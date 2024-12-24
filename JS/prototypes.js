// let computer = {cpu : 12};
//  let lenovo = {
//     screen : "HD",
//     __proto__ : computer
// };
//  let tomHardware = {};
//  console.log('lenovo ', lenovo.__proto__);


 let computer = {cpu : 12};
 let lenovo = {
    screen : "HD",
};
Object.setPrototypeOf(lenovo, computer);
let tomHardware = {};
console.log('lenovo ', lenovo.cpu);