let cityName = document.querySelector(".weather_city"); 
let date_time = document.querySelector(".weather_date_time"); 
let forecast = document.querySelector(".weather_forecast"); 
let icon = document.querySelector(".weather_icon"); 
let temp = document.querySelector(".weather_temperature"); 
let temp_min = document.querySelector(".temp_min"); 
let temp_max = document.querySelector(".temp_max");

let sunset = document.querySelector(".weather_sunset");
let sunrise = document.querySelector(".weather_sunrise");
let clouds = document.querySelector(".weather_clouds");
let humidity = document.querySelector(".weather_humidity");
let wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");


//api id = 60fb7600c3c4e6dae4834ace1188f7eb

const getCountryName = (countryCode) => {
    const countryName = new Intl.DisplayNames([countryCode ], { type: "region" });
    return countryName.of(countryCode);
}
// to get the date and time
const getDateTime = (dt) => {
    const date = new Date(dt *1000);

    const options ={
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

  const formatter = new Intl.DateTimeFormat(navigator.language, options);

    return formatter.format(date);


    }

    let city = "Delhi";

    // search functionality
    citySearch.addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = document.querySelector(".city_name");
        // console.log(cityName.value);
        city = cityName.value;
        getWeatherData();
        cityName.value = "";
        
    })

    // get weather data
const getWeatherData = async () =>{
    const apiKey = "60fb7600c3c4e6dae4834ace1188f7eb";

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try{
        const  res =await fetch(weatherUrl);
        const data = await res.json();
        // console.log(data);

        const { main, name, weather, wind, sys, dt, clouds, visibility } = data;

        cityName.innerHTML =`${name},${getCountryName(sys.country)}`;
        date_time.innerHTML = getDateTime(dt);
        forecast.innerHTML = weather[0].main;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;
        function kelvinToCelsius(kelvin) {
            return (kelvin - 273.15).toFixed(2);
        }
        
        temp.innerHTML = `${kelvinToCelsius(main.temp)}&#176C`;
        temp_min.innerHTML = `Min: ${kelvinToCelsius(main.temp_min)}&#176C`;
        temp_max.innerHTML = `Max: ${kelvinToCelsius(main.temp_max)}&#176C`;
        


        sunset.innerHTML = getDateTime(sys.sunset);
        sunrise.innerHTML = getDateTime(sys.sunrise);
        wind.innerHTML = `${wind.speed} m/s`;
        humidity.innerHTML = `${main.humidity}%`;
pressure.innerHTML = `${main.pressure} hPa`;
clouds.innerHTML = `${(visibility / 1000).toFixed(1)} km`; // visibility shown in kilometers


    }catch(error){
        console.log(error);
    }

}

window.addEventListener("load", getWeatherData);