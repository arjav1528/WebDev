// alert("Connected!");

document
    .getElementById("ChangeTextButton")
    .addEventListener("click", function() {
        let paragraph = document.getElementById("MyParagraph");
        console.log(paragraph.innerHTML)
        paragraph.innerHTML = "Jai hind Dosto"; 
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
    

    
});