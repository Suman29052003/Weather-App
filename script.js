const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = "c9350aabd684419beda1090fcc65a2dc"
const searchInput = document.getElementById('searchinput');
const searchButton = document.getElementById('searchbtn');
const weatherImages = document.getElementById('weatherImages');
const error = document.getElementById('error');
const weatherDiv = document.getElementById('weather')

async function weatherApp(city) {
    let response = await fetch(apiUrl + city + '&appid=' + apiKey);
    if (response.status == 404) {
        error.style.display = "block";
        weatherDiv.style.display = 'none'
        searchInput.value = '';
    }
    else {
        let data = await response.json();

        console.log(data)

        document.getElementById('city').innerHTML = data.name;
        document.getElementById('humidity').innerHTML = data.main.humidity + ' %';
        document.getElementById('wind').innerHTML = data.wind.speed + ' km/h';
        document.getElementById('temp').innerHTML = Math.round(data.main.temp) + '&deg;C';

        if (data.weather[0].main == "Clear") {
            weatherImages.src = 'images/clear.png';
        }
        else if (data.weather[0].main == "Clouds") {
            weatherImages.src = 'images/clouds.png';
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherImages.src = 'images/drizzle.png';
        }
        else if (data.weather[0].main == "Mist") {
            weatherImages.src = 'images/mist.png';
        }
        else if (data.weather[0].main == "Snow") {
            weatherImages.src = 'images/snow.png';
        }
        
        error.style.display = "none";
        weatherDiv.style.display = 'block' 
        searchInput.value = '';
    }
}

searchInput.addEventListener('keydown',(event)=>{
    if(event.key ==='Enter'){
        searchButton.click();
    }
});

searchButton.addEventListener('click', () => {
    console.log('Button clicked. City:', searchInput.value);
    weatherApp(searchInput.value);
});




