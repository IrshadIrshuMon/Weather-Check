const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = ""; // get your Key

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else displayError("Please enter a city");
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok) throw new Error("Could not fetch weather data");
    return await response.json();
}

function displayWeatherInfo(data){
    let city = data.name;
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let description = data.weather[0].main;
    let id = data.weather[0].id;
    card.textContent = "";
    card.style.display = "flex";

    let cityDisplay = document.createElement("h1");
    let tempDisplay = document.createElement("p");
    let humidityDisplay = document.createElement("p");
    let descDisplay = document.createElement("p");
    let weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(2)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.append(cityDisplay);
    card.append(tempDisplay);
    card.append(humidityDisplay);
    card.append(descDisplay);
    card.append(weatherEmoji);
}

function getWeatherEmoji(id){
    if(id>=200 && id<300) return "⛈️";
    else if(id>=300 && id<400) return "🌦️";
    else if(id>=500 && id<600) return "🌧️";
    else if(id>=600 && id<700) return "❄️";
    else if(id>=700 && id<800) return "🌫️";
    else if(id===800) return "☀️";
    else if(id===801) return "🌤️";
    else if(id===802) return "⛅";
    else if(id===803 || id===804) return "☁️";
    else return "❓";
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}