function getWeather() {
    const apiKey = 'ad4158a5b92428bd581c5bba5631730c';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}






const clothingItems = {
    male: {
        top: [
            { name: "T-Shirt", minTemp: 15, material: "Cotton" },
            { name: "Shirt", minTemp: 10, material: "Cotton" },
            { name: "Jacket", minTemp: 5, material: "Leather" },
            { name: "Sweater", minTemp: 0, material: "Wool" }
        ],
        bottom: [
            { name: "Jeans", minTemp: 10, material: "Denim" },
            { name: "Trousers", minTemp: 10, material: "Cotton" },
            { name: "Shorts", minTemp: 20, material: "Cotton" }
        ]
    },
    female: {
        top: [
            { name: "Blouse", minTemp: 15, material: "Silk" },
            { name: "T-Shirt", minTemp: 10, material: "Cotton" },
            { name: "Sweater", minTemp: 5, material: "Wool" },
            { name: "Jacket", minTemp: 0, material: "Leather" }
        ],
        bottom: [
            { name: "Skirt", minTemp: 15, material: "Cotton" },
            { name: "Jeans", minTemp: 10, material: "Denim" },
            { name: "Leggings", minTemp: 5, material: "Spandex" },
            { name: "Shorts", minTemp: 20, material: "Cotton" }
        ]
    }
};

function recommendClothing() {
    const gender = document.getElementById('gender').value;
    const clothingType = document.getElementById('clothing-type').value;
    const temperature = parseFloat(document.getElementById('temperature').value);

    if (isNaN(temperature)) {
        alert('Please enter a valid temperature.');
        return;
    }

    let recommendations = [];

    clothingItems[gender][clothingType].forEach(item => {
        if (temperature >= item.minTemp) {
            recommendations.push(`${item.name} (${item.material})`);
        }
    });

    if (recommendations.length === 0) {
        document.getElementById('recommendation').innerText = "No recommendations found.";
    } else {
        document.getElementById('recommendation').innerText = `Recommended clothing:\n${recommendations.join('\n')}`;
    }
}