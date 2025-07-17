const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#weather_icon');
const myHigh = document.querySelector('#high');
const myLow = document.querySelector('#low');
const myHumidity = document.querySelector('#humidity');
const mySunrise = document.querySelector('#sunrise');
const mySunset = document.querySelector('#sunset');

const myKey = "1a50068bfa65620cc26a18e9f9e22ab5"
const myLat = "41.89324563265339"
const myLong = "12.475499689958006"


const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`


async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    myTown.innerHTML = "Current Weather in " + data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;C`
    const iconsrc = `images/weather-icon.svg`
    myGraphic.innerHTML = `
        <img src="${iconsrc}" id="graphic" alt="${data.weather[0].description}">
    `;

    myHigh.innerHTML = `High temp: ${data.main.temp_max}&deg;C`
    myLow.innerHTML = `Low temp: ${data.main.temp_min}&deg;C`
    myHumidity.innerHTML = "Humidity: " + data.main.humidity + "%"
}

apiFetch();




