document.addEventListener('DOMContentLoaded', function() {
    let cityInput = document.getElementById('city-input');
    let submitButton = document.getElementById('submit-button');
    let city = document.getElementById('city');
    let temperature = document.getElementById('temperature');
    let weather = document.getElementById('weather');
    let errormsg = document.getElementById('error');
    let APIkey = '0a27a0ccb32a8a691af34ab115dd09cc';
    submitButton.addEventListener('click', async function() {
        console.log(cityInput.value);
        if(cityInput.value === '') {
            return;
        }
        else{
            try{
                city = cityInput.value;
                // console.log(city);
                let data = await getWeatherData(cityInput.value);
                console.log(data);
                data.cod === 200 ? displayWeatherData(data) : displayError(data.message);
            }catch(err){
                displayError(err.message);
                console.log(err);
            }
        }
    })

    async function getWeatherData(city){
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
            let response = await fetch(url);
            let data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            
        }
        
    }
    function displayWeatherData(data){
        if (!temperature || !weather || !errormsg || !city) {
            console.error('Required DOM elements not found');
            return;
        }
        else{
            let temp = (data.main.temp - 273.15).toFixed(2);
            temperature.textContent = 'Temperature : ' + temp + '°C' ;
            weather.textContent = 'Weather : ' + data.weather[0].description.toUpperCase();
            weather.textContent = 'Weather : ' + data.weather[0].description.toUpperCase();
            city.textContent = data.name;

            errormsg.textContent = '';
            // // errormsg.textContent
            // console.log(data.main.temp);
            // console.log(data.weather[0].description);
        }
    }
    function displayError(error){
        temperature.textContent = '';
        weather.textContent = '';
        errormsg.textContent = error.message.toUpperCase();
    }
});