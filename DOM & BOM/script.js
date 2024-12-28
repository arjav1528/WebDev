// alert("Connected!");

document
    .getElementById("ChangeTextButton")
    .addEventListener("click", function() {
        let paragraph = document.getElementById("MyParagraph");
        console.log(paragraph.innerHTML)
        paragraph.innerHTML = "Jai hind Dosto"; 
        // alert("Teri maa ki chut");
    });



// document
//     .getElementById("highlight")
//     .addEventListener("click", function() {
//         let hold = document.getElementById("citiesList");
//         // console.log(hold.innerHTML)
//         let cities = hold.firstElementChild;
//         console.log(cities.classList.add("highlight"));
        
//     });

document
    .getElementById('highlight')
    .addEventListener('click', function() {
    let hold = document.getElementById('citiesList');
    let cities = hold.children;
    cities[0].classList.add('animation');
    for(let i=0;i<cities.length;i++){
        console.log(cities[i].innerHTML);
    }
    });



document
    .getElementById("changeOrder")
    .addEventListener('click',function(){
        let coffeeType = document.getElementById("coffeeType") ;
        // console.log(hold);
        coffeeType.classList.add("transtime");
        coffeeType.classList.add('animation');
        coffeeType.textContent = "Espresso"; 
    });




document.getElementById("addNewItem").addEventListener('click',function(){
    let ul = document.getElementById("myList");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("New City"));
    ul.appendChild(li);
    });





document.getElementById("removeItem").addEventListener('click',function(){
    let ul = document.getElementById("myList2");
    let items = ul.children;
    ul.removeChild(items[items.length-1]);

});



document
    .getElementById("alertButton")
    .addEventListener('click',function(){
        alert("Hello World");
});




document. getElementById("teaList").addEventListener('click',function(event){

    console.log(event.target.innerHTML);
    alert("You clicked on " + event.target.innerHTML);
})