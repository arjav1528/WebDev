document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const submitButton = document.getElementById('submit-button');
    const city = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const weather = document.getElementById('weather');
    const error = document.getElementById('error');
    const APIkey = '0a27a0ccb32a8a691af34ab115dd09cc';

    submitButton.addEventListener('click', function() {
        console.log(cityInput.value);
        if(cityInput.value === '') {
            error.textContent = 'Please enter a city';
            return;
        }
        else{
            error.textContent = '';
            city = cityInput.value.trim();


        }
    });

    function getWeatherData(city){

    }


    function displayWeatherData(data){
        
    }
     

});