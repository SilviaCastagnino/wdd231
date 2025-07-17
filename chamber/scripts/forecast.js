document.addEventListener('DOMContentLoaded', function () {
    const townForecast = document.getElementById('townForecast');
    const forecastElements = [
        document.getElementById('oneForecast'),
        document.getElementById('twoForecast'),
        document.getElementById('threeForecast'),
        document.getElementById('fourForecast')
    ];

    if (!townForecast || forecastElements.some(el => !el)) {
        console.error('Some forecast elements not found in DOM');
        return;
    }

    const key = "1a50068bfa65620cc26a18e9f9e22ab5";
    const lat = "41.89324563265339";
    const long = "12.475499689958006";
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=metric`;

    async function apiForecast() {
        try {
            const response = await fetch(forecastURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayForecast(data);
        } catch (error) {
            console.error('Error loading forecast:', error);
            townForecast.textContent = "Forecast unavailable";
            forecastElements.forEach(el => {
                el.textContent = "Data not available";
                el.classList.add('error-message');
            });
        }
    }

    function displayForecast(data) {
        townForecast.textContent = "Weather Forecast in " + data.city.name;


        const dailyForecasts = data.list.filter((forecast, index) => {
            return index % 8 === 0;
        }).slice(0, 4);


        dailyForecasts.forEach((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

            forecastElements[index].innerHTML = `
                <div class="forecast-day">${dayName} ${formattedDate}</div>
                <img src="${iconUrl}" alt="${day.weather[0].description}" class="forecast-icon">
                <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
                <div class="forecast-desc">${day.weather[0].description}</div>
                <div class="forecast-minmax">
                    <span class="max-temp">H: ${Math.round(day.main.temp_max)}°</span>
                    <span class="min-temp">L: ${Math.round(day.main.temp_min)}°</span>
                </div>
            `;
        });
    }

    apiForecast();
});

