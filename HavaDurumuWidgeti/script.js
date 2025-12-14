const apiKey = "f3c18326acfd4615355f044c1c54e3ee"; // Sizin Aktif Anahtarınız
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr"; 

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfoDiv = document.getElementById('weather-info');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temperature');
const descDisplay = document.getElementById('description');
const iconDisplay = document.getElementById('weather-icon');
const errorDisplay = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        errorDisplay.textContent = "Lütfen bir şehir adı giriniz.";
        errorDisplay.style.display = 'block'; 
        weatherInfoDiv.style.display = 'none';
    }
});

async function getWeatherData(city) {
    const url = `${apiUrl}&q=${city}&appid=${apiKey}`;
    
    errorDisplay.style.display = 'none';
    weatherInfoDiv.style.display = 'none';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Girdiğiniz şehir bulunamadı.');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        errorDisplay.textContent = `Hata: ${error.message}`;
        errorDisplay.style.display = 'block';
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    cityNameDisplay.textContent = data.name;
    tempDisplay.textContent = `${temp}°C`;
    descDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    iconDisplay.src = iconUrl;
    
    weatherInfoDiv.style.display = 'block';
}