const Person = {
    name : 'Arjav',
    greet() {
        console.log('Hello, my name is ' + this.name);
    }
}



Person.greet();

const greetFunction = Person.greet;
greetFunction();



const newgreeter = Person.greet.bind({name : 'Raj'});
newgreeter();