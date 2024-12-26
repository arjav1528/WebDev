// alert("Connected!");

document
    .getElementById("ChangeTextButton")
    .addEventListener("click", function() {
        let paragraph = document.getElementById("MyParagraph");
        console.log(paragraph.innerHTML)
        paragraph.innerHTML = "Jai hind Dosto"; 
    });
